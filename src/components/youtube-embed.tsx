import React, { useEffect, useState } from "react";
import { YoutubeEmbedProps } from "../models/props.interface";

const YoutubeEmbed = ({
  embedId,
  url,
}: YoutubeEmbedProps): React.ReactElement => {
  const [videoId, setVideoId] = useState(embedId);
  useEffect(() => {
    if (url) {
      const match = /v=(\w+)/.exec(url);
      if (match && match[1]) {
        setVideoId(match[1]);
      }
    }
  });

  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;

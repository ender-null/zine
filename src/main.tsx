import { AptabaseProvider } from "@aptabase/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.sass";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AptabaseProvider
      appKey={import.meta.env.VITE_APTABASE_APP_ID}
      options={{ host: import.meta.env.VITE_APTABASE_HOST }}
    >
      <App />
    </AptabaseProvider>
  </StrictMode>,
);

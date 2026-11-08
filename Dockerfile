# A pinned LTS major rather than the moving `node:alpine`: that tag moved to a
# Node whose image no longer bundles yarn, and the build broke on the next push.
FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

# Node 24's image still ships yarn 1, which yarn.lock is written by.
RUN yarn --frozen-lockfile
RUN yarn build

FROM node:24-alpine AS server

LABEL org.opencontainers.image.source=https://github.com/ender-null/zine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist .

# The image's unprivileged user: serve needs no root to listen on 3000.
USER node

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]

FROM node:alpine AS builder

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY . .

RUN yarn --frozen-lockfile
RUN yarn build

FROM nginx:latest AS release

LABEL org.opencontainers.image.source https://github.com/ender-null/zine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
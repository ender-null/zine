FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile
RUN yarn build

FROM node:alpine as server

LABEL org.opencontainers.image.source https://github.com/ender-null/zine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
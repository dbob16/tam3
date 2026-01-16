FROM docker.io/node:lts-alpine AS build

ENV NODE_ENV=production

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

RUN mkdir /data

COPY build/ ./build/
COPY drizzle.config.js .
COPY drizzle/ ./drizzle/

ENV DATABASE_URL=file:/data/local.db
ENV SETTINGS_PATH=/data/settings.json
ENV BODY_SIZE_LIMIT=100M
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY deploy/start-server.sh start-server.sh

EXPOSE 3000

CMD ["sh", "start-server.sh"]

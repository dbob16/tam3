FROM docker.io/node:lts-alpine AS build

RUN mkdir /data
WORKDIR /app

COPY . .
RUN npm install && npm run build

ENV DATABASE_URL=file:/data/local.db
ENV SETTINGS_PATH=/data/settings.json
ENV BODY_SIZE_LIMIT=100M
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY deploy/start-server.sh start-server.sh

EXPOSE 3000

CMD ["sh", "start-server.sh"]
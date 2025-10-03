FROM docker.io/node:lts-alpine AS build

RUN mkdir /data
WORKDIR /app

COPY . .
RUN npm install && npm run build

ENV DATABASE_URL=file:/data/local.db

COPY deploy/start-server.sh start-server.sh

EXPOSE 3000

CMD ["sh", "start-server.sh"]
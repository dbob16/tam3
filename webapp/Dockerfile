FROM node:lts-alpine AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:lts-alpine AS prod

WORKDIR /data
WORKDIR /app

ENV DATABASE_URL=file:/data/local.db

COPY --from=build /app/build/. build/.
COPY --from=build /app/package.json /app/drizzle.config.js .
COPY --from=build /app/drizzle drizzle
COPY deploy/start-server.sh start-server.sh

RUN npm install --production && npm install drizzle-kit

EXPOSE 3000

CMD ["sh", "start-server.sh"]
# syntax=docker/dockerfile:1

FROM node:14.21.3-slim

ENV APP_HOME=/home/zacatzontli/app

RUN mkdir -p ${APP_HOME}

WORKDIR ${APP_HOME}

COPY . .

RUN npm install && npm cache clean --force

EXPOSE 1337

CMD ["node", "app.js"]

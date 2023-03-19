FROM node:18.14.1-alpine3.16
RUN apk update && apk add bash


WORKDIR /app
COPY ./package.json /.
RUN npm install
COPY . .

ARG DB_HOST

ENV DATABASE_URL postgresql://postgres:Aa123456@${DB_HOST}:5432/syte-todo-list
ENV JWT_KEY "ELsecret0deSyteTodoList"

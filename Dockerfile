FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache --virtual python

COPY package.json yarn.lock prisma .env ./

RUN yarn install --frozen-lockfile
RUN yarn run init-db

COPY . .

CMD ["yarn", "dev"]
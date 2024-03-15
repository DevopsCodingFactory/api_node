FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock prisma .env ./

RUN yarn install --frozen-lockfile
RUN yarn run prisma:generate

COPY . .

RUN yarn build

CMD ["yarn", "start"]
FROM node:18.2.0-alpine as Production

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
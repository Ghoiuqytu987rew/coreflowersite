FROM node:18.2.0-alpine as Production
WORKDIR /usr/src/client

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]

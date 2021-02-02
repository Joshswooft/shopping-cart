FROM node:15-alpine

WORKDIR /app

ADD package.json /app/package.json

ADD . /app
RUN yarn && yarn build

EXPOSE 8000

CMD ["node", "main.js"]
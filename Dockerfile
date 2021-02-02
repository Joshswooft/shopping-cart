FROM node:15

WORKDIR /app

ADD package.json /app/package.json

RUN yarn

ADD . /app

CMD ["yarn" "start"]
FROM node:15

WORKDIR /app

ADD package.json /app/package.json

RUN yarn

ADD packages/shopping-cart/* /app

CMD ["yarn" "workspace @carto/shopping-cart start"]
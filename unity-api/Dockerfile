FROM node:12.0.0

LABEL Author="Sam Jamal"
LABEL Description="image for unity-api Node.js/postgres app"
LABEL version="0.0.1"

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

CMD ["yarn", "start"]
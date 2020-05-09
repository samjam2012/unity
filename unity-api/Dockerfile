FROM node:12.0.0-alpine

LABEL Author="Sam Jamal"
LABEL Description="image for unity-api Node.js/postgres app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
RUN mkdir -p /unity/unity-api
WORKDIR /unity/unity-api

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "start"]
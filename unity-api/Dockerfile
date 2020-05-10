FROM node:12.0.0-alpine

LABEL Author="Sam Jamal"
LABEL Description="image for unity-api Node.js/postgres app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
ENV UNITY_API /unity/unity-api
RUN mkdir -p $UNITY_API
WORKDIR $UNITY_API

COPY package.json $UNITY_API
COPY yarn.lock $UNITY_API

RUN yarn

COPY . $UNITY_API

CMD ["yarn", "start"]
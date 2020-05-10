FROM node:12.0.0

LABEL Author="Sam Jamal"
LABEL Description="image for unity-api Node.js/postgres app"
LABEL version="0.0.1"


RUN mkdir -p /unity/unity-api
WORKDIR /unity/unity-api

COPY . ./

EXPOSE 8090

CMD ["yarn", "start"]
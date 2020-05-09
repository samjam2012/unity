FROM node:12.0.0-alpine

LABEL Author="Sam Jamal"
LABEL Description="image for unity-hospital React app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
RUN mkdir -p /unity/unity-hospital
WORKDIR /unity/unity-hospital

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "start"]
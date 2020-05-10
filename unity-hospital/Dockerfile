FROM node:12.0.0-alpine

LABEL Author="Sam Jamal"
LABEL Description="image for unity-hospital React app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
ENV UNITY_HOSPITAL /unity/unity-hospital
RUN mkdir -p $UNITY_HOSPITAL
WORKDIR $UNITY_HOSPITAL

COPY package.json $UNITY_HOSPITAL
COPY yarn.lock $UNITY_HOSPITAL

RUN yarn && \
  yarn build && \
  yarn global add serve && \
  serve

COPY . $UNITY_HOSPITAL

CMD ["yarn", "start"]
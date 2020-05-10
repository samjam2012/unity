FROM node:12.0.0 as build

LABEL Author="Sam Jamal"
LABEL Description="image for unity-hospital React app"
LABEL version="0.0.1"

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

# build production server to hold static files
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
FROM node:12.0.0 as unity-build

LABEL Author="Sam Jamal"
LABEL Description="image for unity-hospital React app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
RUN mkdir -p /unity/unity-hospital
WORKDIR /unity/unity-hospital

COPY . .

# build production server to hold static files
FROM nginx:alpine
COPY /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
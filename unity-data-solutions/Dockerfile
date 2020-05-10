FROM python:3.7.7

LABEL Author="Sam Jamal"
LABEL Description="image for unity-data-solutions flask app"
LABEL version="0.0.1"

WORKDIR /app

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 4433
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD [ "uwsgi", "--ini", "app.ini" ]
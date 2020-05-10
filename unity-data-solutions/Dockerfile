FROM python:3.7.7

LABEL Author="Sam Jamal"
LABEL Description="image for unity-data-solutions flask app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
ENV UNITY_DATA /unity/unity-data-solutions

RUN mkdir -p $UNITY_DATA
WORKDIR $UNITY_DATA

EXPOSE 4433

COPY requirements.txt $UNITY_DATA

RUN pip install -r requirements.txt

COPY . $UNITY_DATA

CMD [ "uwsgi", "--ini", "app.ini" ]
FROM python:3.7.7

LABEL Author="Sam Jamal"
LABEL Description="image for unity-data-solutions flask app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
RUN mkdir -p /unity/unity-data-solutions
WORKDIR /unity/unity-data-solutions

COPY requirements.txt ./

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . ./

CMD python -m flask run
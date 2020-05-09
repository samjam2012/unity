FROM python:3.7.7-alpine

LABEL Author="Sam Jamal"
LABEL Description="image for unity-data-solutions flask app"
LABEL version="0.0.1"

# creating 'unity' holding container for apps
RUN mkdir -p /unity/unity-data-solutions
WORKDIR /unity/unity-data-solutions

COPY Pip* ./

RUN pip install --upgrade pip && \
    pip install pipenv && \
    pipenv install --dev --system --deploy --ignore-pipfile

COPY . ./

CMD pipenv run python -m flask run
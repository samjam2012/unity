FROM python:3.7.7

LABEL Author="Sam Jamal"
WORKDIR /app

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY . /app

CMD ["web:", "gunicorn", "run:app"]
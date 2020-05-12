FROM python:3.7.7

LABEL Author="Sam Jamal"
WORKDIR /app

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY . /app

EXPOSE 4433

CMD ["python", "-m", "flask", "run", "--port", "4433"]
FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app

COPY ./app /app/

COPY docker/django/requirements.txt /app/
RUN pip install -r requirements.txt
RUN rm requirements.txt

RUN mkdir ~/.aws
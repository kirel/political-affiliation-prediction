FROM python:2.7.9
RUN apt-get -y update && apt-get -y install build-essential gfortran libatlas-base-dev
ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
ADD api.py /app/api.py
ADD classifier.py /app/classifier.py
ADD model /app/model
ADD templates /app/templates

WORKDIR /app
EXPOSE 5000
CMD python /app/api.py

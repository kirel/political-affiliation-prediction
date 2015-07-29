FROM python:2.7.9
RUN apt-get -y update && apt-get -y install build-essential gfortran libatlas-base-dev
RUN pip install --upgrade pip
ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
ADD api.py /app/api.py
ADD newsreader.py /app/newsreader.py
ADD downloader.py /app/downloader.py
ADD classifier.py /app/classifier.py
ADD vectorizer.py /app/vectorizer.py
ADD model /app/model
ADD web/build /app/web/build

WORKDIR /app
EXPOSE 5000
CMD python /app/api.py

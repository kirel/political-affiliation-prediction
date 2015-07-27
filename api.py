import flask
from flask import Flask, request, jsonify, render_template
import os
app = Flask(__name__, static_folder='web/build')

from classifier import Classifier
# from downloader import Downloader
from retrying import retry
import urllib2
from bs4 import BeautifulSoup
from readability.readability import Document

DEBUG = os.environ.get('DEBUG') != None
VERSION = 0.1

### news regeneration

from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()

@scheduler.scheduled_job(trigger='cron', minute='0,30')
def fetch_news_job():
  # TODO really fetch news
  0

@scheduler.scheduled_job(trigger='cron', hour='3')
def retrain_classifier_job():
  # TODO really fetch new bundestag data and retrain classifier
  0

### API

@retry(stop_max_attempt_number=5)
def fetch_url(url):
    '''
    get url with readability
    '''
    html = urllib2.urlopen(url).read()
    readable_article = Document(html).summary()
    title = Document(html).short_title()
    text = BeautifulSoup(readable_article).get_text()

    return title,text

@app.route("/api")
def api():
    return jsonify(dict(message='political affiliation prediction api', version=VERSION))

@app.route("/api/predict", methods=['POST'])
def predict():
    if request.form.has_key('url'):
        url = request.form['url']
        text,title = fetch_url(url)
        return jsonify(classifier.predict(text))
    else:
        text = request.form['text']
        return jsonify(classifier.predict(text))

@app.route('/api/distances.json')
def news():
  return flask.send_from_directory('model', 'distances.json')

# static files from web/build

@app.route('/')
def root():
  return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

if __name__ == "__main__":
    port = 5000
    classifier = Classifier()
    # Open a web browser pointing at the app.
    # os.system("open http://localhost:{0}".format(port))

    scheduler.start()
    app.run(host='0.0.0.0', port = port, debug = DEBUG)

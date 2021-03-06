# -*- coding: utf-8 -*-
import flask
from flask import Flask, request, jsonify, render_template
import os
app = Flask(__name__, static_folder='web/build')

from raven.contrib.flask import Sentry
app.config['SENTRY_DSN'] = 'https://85db503b6be040a2942ffb3a24577b14:ab5fe479abe540f4817f2e13e4ed6e95@app.getsentry.com/49850'
sentry = Sentry(app)

from classifier import Classifier
# from downloader import Downloader
from retrying import retry
import urllib2
from bs4 import BeautifulSoup
from readability.readability import Document

DEBUG = os.environ.get('DEBUG') != None
VERSION = 0.1

classifier = Classifier()

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

### API

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
    # Open a web browser pointing at the app.
    # os.system("open http://localhost:{0}".format(port))

    app.run(host='0.0.0.0', port = port, debug = DEBUG)

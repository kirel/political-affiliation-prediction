from flask import Flask, request, jsonify
import os
app = Flask(__name__)

from classifier import Classifier
# from downloader import Downloader

DEBUG = os.environ.get('DEBUG') != None
VERSION = 0.1

@app.route("/")
def root():
    return jsonify(dict(message='political affiliation prediction api', version=VERSION))

@app.route("/predict", methods=['POST'])
def predict():
    if request.form.has_key('url'):
        url = request.form['url']
        return jsonify(classifier.predict_url(url))
    else:
        text = request.form['text']
        return jsonify(classifier.predict(text))

if __name__ == "__main__":
    classifier = Classifier()
    app.run(debug = DEBUG)

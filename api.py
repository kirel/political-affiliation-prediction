from flask import Flask, request, jsonify, render_template
import os
app = Flask(__name__)

from classifier import Classifier
# from downloader import Downloader

DEBUG = os.environ.get('DEBUG') != None
VERSION = 0.1

@app.route("/")
def index():
    """
    When you request the root path, you'll get the index.html template.

    """
    return render_template("index.html")

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
    port = 5000
    classifier = Classifier()
    # Open a web browser pointing at the app.
    # os.system("open http://localhost:{0}".format(port))

    app.run(port = port, debug = DEBUG)

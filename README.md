# political-affiliation-prediction

## Setup

Install [virualenv(-wrapper)](https://virtualenvwrapper.readthedocs.org/en/latest/).

    mkvirtualenv political-affiliation-prediction
    # or
    workon political-affiliation-prediction
    pip install -r requirements.txt

## Start server with pretrained classifier    

    DEBUG=1 python api.py

## Test with some party-specific buzzwords

    curl --data "text=angriffskrieg" 127.0.0.1:5000/predict
    curl --data "text=superreichen" 127.0.0.1:5000/predict
    curl --data "text=soziale gerechtigkeit" 127.0.0.1:5000/predict
    curl --data "text=sicherheit" 127.0.0.1:5000/predict

## Test with some newspapers

    curl --data "url=http://www.zeit.de/politik/ausland/2015-04/iran-verhandlungen-einigung" 127.0.0.1:5000/predict
    curl --data "url=http://www.sueddeutsche.de/politik/atomverhandlungen-in-lausanne-das-sind-die-eckpunkte-der-einigung-mit-iran-1.2421243" 127.0.0.1:5000/predict
    curl --data "url=http://www.faz.net/aktuell/politik/ausland/europa/einigung-in-lausanne-durchbruch-bei-verhandlungen-ueber-iranisches-atomprogramm-13520160.html" 127.0.0.1:5000/predict

## Download German parliament speeches text files, parse and extract Bag-of-Words feature vectors

    python downloader.py --download --parse --transform

## Retrain classifier

    If no classifier.pickle file is in the model folder, the classifier will be retrained

    The classifier can be explicitly retrained, as e.g. in a python shell:

    from classifier import *
    clf = Classifier(folder='path/to/textfiles',train=True)

## Check how well the classifier generalizes by doing nested cross-validation

In python shell:

    from example import test_with_nested_CV
    test_with_nested_CV(folder='path/to/textfiles')

## Compute correlations between words and party and dump result to json (very slow) 

In python shell:

    from example import word_party_correlations
    word_party_correlations(folder='path/to/textfiles')

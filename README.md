# political-affiliation-prediction

## Setup

Install [virualenv(-wrapper)](https://virtualenvwrapper.readthedocs.org/en/latest/).

    mkvirtualenv political-affiliation-prediction
    # or
    workon political-affiliation-prediction
    pip install -r requirements.txt

## Start server with pretrained classifier    

    DEBUG=1 python api.py

## Test with party-specific buzzwords

    curl --data "text=angriffskrieg" 127.0.0.1:5000/predict
    curl --data "text=reiche banken" 127.0.0.1:5000/predict
    curl --data "text=herdprämie" 127.0.0.1:5000/predict
    curl --data "text=sicherheit" 127.0.0.1:5000/predict

## Test with some newspapers

    curl --data "url=http://www.zeit.de/politik/ausland/2015-04/iran-verhandlungen-einigung" 127.0.0.1:5000/predict
    curl --data "url=http://www.sueddeutsche.de/politik/atomverhandlungen-in-lausanne-das-sind-die-eckpunkte-der-einigung-mit-iran-1.2421243" 127.0.0.1:5000/predict
    curl --data "url=http://www.faz.net/aktuell/politik/ausland/europa/einigung-in-lausanne-durchbruch-bei-verhandlungen-ueber-iranisches-atomprogramm-13520160.html" 127.0.0.1:5000/predict

## Get German Parliament discussions

In order to train a classifier we download, parse and Bag-of-word transform the speeches and discussions of the German Bundestag from http://www.bundestag.de/plenarprotokolle'

    python downloader.py --download --parse --transform

## Retrain classifier

If no classifier.pickle file is in the model folder, the classifier will be retrained
The classifier can be explicitly retrained, as e.g. in a python shell:

    from classifier import *
    clf = Classifier(folder='model',train=True)

## Check classifier by cross-validation

In python shell:

    from example import test_with_nested_CV
    test_with_nested_CV(folder='model')

## Download Newspaper articles

In python shell:
    
    from downloader import get_news, pairwise_distance
    get_news()
    pairwise_distance()

# Deployment

    docker build -t kirel/political-affiliation-prediction -t
    docker push kirel/political-affiliation-prediction

To test the container locally:

    docker run -i -t -p 5000:5000 kirel/political-affiliation-prediction

To deploy:

    pip install -r requirements.dev.txt
    ansible-playbook ansible/deploy.yml -i ansible/inventory

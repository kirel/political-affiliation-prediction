# political-affiliation-prediction

## Setup

Install [virualenv(-wrapper)](https://virtualenvwrapper.readthedocs.org/en/latest/).

    mkvirtualenv political-affiliation-prediction
    # or
    workon political-affiliation-prediction
    pip install -r requirements.dev.txt

and for the frontend

- Install ruby e.g. via https://github.com/sstephenson/rbenv#homebrew-on-mac-os-x

    cd web
    bundle

## Preparation
### Get German Parliament discussions

In order to train a classifier we download, parse and Bag-of-word transform the speeches and discussions of the German Bundestag from http://www.bundestag.de/plenarprotokolle'

    python downloader.py --download --parse

### Download Newspaper articles

Downloads news articles on politics landing page of various german newspapers and computed pairwise distances between them

    python newsreader.py --download --distances

The results are stored in a `distances-xxx.json` file, but also in `distances.json` to be served to the web gui.

## Run

### Start server with pretrained classifier

    DEBUG=1 NOJOBS=1 python api.py

### Start the frontend development server

    cd web
    dotenv bundle exec middleman

REMARK: The frontend needs the backend running!

## Test

### with party-specific buzzwords

    curl --data "text=angriffskrieg" 127.0.0.1:5000/predict
    curl --data "text=reiche banken" 127.0.0.1:5000/predict
    curl --data "text=herdprämie" 127.0.0.1:5000/predict
    curl --data "text=sicherheit" 127.0.0.1:5000/predict

### Test with some newspapers

    curl --data "url=http://www.zeit.de/politik/ausland/2015-04/iran-verhandlungen-einigung" 127.0.0.1:5000/predict
    curl --data "url=http://www.sueddeutsche.de/politik/atomverhandlungen-in-lausanne-das-sind-die-eckpunkte-der-einigung-mit-iran-1.2421243" 127.0.0.1:5000/predict
    curl --data "url=http://www.faz.net/aktuell/politik/ausland/europa/einigung-in-lausanne-durchbruch-bei-verhandlungen-ueber-iranisches-atomprogramm-13520160.html" 127.0.0.1:5000/predict

### Retrain classifier

If no classifier.pickle file is in the model folder, the classifier will be retrained
The classifier can be explicitly retrained, as e.g. in a python shell:

    from classifier import *
    clf = Classifier(folder='model',train=True)

### Check classifier by cross-validation

In python shell:

    from example import test_with_nested_CV
    test_with_nested_CV(folder='model')

## Visualization & Exploration

    $ ipython notebook

Then check the notebooks i.e. [visualization.ipynb](visualization.ipynb)

## Deployment

First build the web project

    cd web && dotenv bundle exec middleman build

The build the container

    docker build -t kirel/political-affiliation-prediction .
    docker push kirel/political-affiliation-prediction

To test the container locally:

    docker run -it --rm -p 5000:5000 kirel/political-affiliation-prediction

To deploy:

    pip install -r requirements.dev.txt
    ansible-playbook ansible/deploy.yml -i ansible/inventory

### When the registry fails

docker save kirel/political-affiliation-prediction | bzip2 | pv | ssh ubuntu@52.28.176.27 'bunzip2 | sudo docker load'

## License

Copyright (c) 2015 Daniel Kirsch, Felix Bießmann, released under the MIT license, see [MIT-LICENSE](MIT-LICENSE)

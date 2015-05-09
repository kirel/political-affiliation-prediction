# -*- coding: utf-8 -*-
import cPickle
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d
import urllib2
from bs4 import BeautifulSoup
import os
from scipy.sparse import vstack
from numpy.random import permutation
from sklearn.linear_model import LogisticRegression
from sklearn.grid_search import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn import metrics
from time import sleep

class Classifier:

    def __init__(self,folder='model',train=False):
        '''
        Creates a classifier object
        if no model is found, or train is set True, a new classifier is learned

        INPUT
        folder  the root folder with the Bag-of-Word data, where the model is stored
        train   set True if you want to train 

        '''
        self.folder = folder
        # if there is no classifier file or training is invoked
        if (not os.path.isfile(self.folder+'/classifier.pickle')) or train:
            print 'Training classifier'
            self.train()
        print 'Loading classifier'
        clfdict = cPickle.load(open(self.folder+'/classifier.pickle'))
        self.clf = clfdict['classifier']
        self.parties = clfdict['labels']
        # load Bag-of-Word extractor
        self.BoW = cPickle.load(open(self.folder+'/BoW_transformer.pickle'))

    def predict_url(self, url):
        '''
        Calls 'predict' on the <p> elements of a webpage (presumably text) 

        INPUT
        url    a url (to e.g. a newspaper article page)
        folder  the folder containing the classifier and BoW transformer pickles
        
        '''
        # load the website and parse the html
        try:
            text = urllib2.urlopen(url).read()
        except urllib2.URLError, e:
            print e
            sleep(5)
            text = urllib2.urlopen(url).read()
        soup = BeautifulSoup(text)
        # extract paragraphs and concatenate them together in one string
        paragraphs = ' '.join(map((lambda x:x.getText()),soup.find_all('p')))
        # call the classifier
        return self.predict(paragraphs)


    def predict(self,text):
        '''
        Loads scikit-learn Bag-of-Word extractor and classifier and
        applies it to some text. 

        INPUT
        text    a string to assign to a party
        folder  the folder containing the classifier and BoW transformer pickles
        
        '''

        # transform string into sparse matrix
        x = self.bow(text)
        # predict probabilities of each party
        probabilities = self.clf.predict_proba(x)
        # transform the predictions into json output
        result = {'text':text,'prediction':[]}
        # the classifier returns parties in alphabetical order, so we reorder
        for pidx in range(len(self.parties)): 
            result['prediction'].append(
                {   'party':self.parties[pidx],
                    'probability':probabilities.flatten()[pidx]
                })
        return result

    def bow(self,text):
        x = self.BoW['count_vectorizer'].transform([text.lower()])
        if self.BoW.has_key('tfidf_transformer'):
            x = self.BoW['tfidf_transformer'].transform(x)
        return x

    def train(self,folds = 4):
        '''
        trains a classifier on the bag of word vectors extracted with extract_bundestag speeches.py

        INPUT
        folder  the folder to store the model file and load the BoW file
        folds   number of cross-validation folds for optimizing the regularizer of the classifier

        '''
        # load the data
        data = cPickle.load(open(self.folder+'/BoW.pickle'))

        # create numerical labels for each party
        Y = hstack(map((lambda x: ones(data[data.keys()[x]].shape[0])*x),range(len(data))))
        # create the data matrix
        X = vstack(data.values())
        # estimate fold size (if not a divisor of total samples)
        fsize = len(Y)/folds
        # permute data indices for training
        randidx = permutation(len(Y))
        Y = Y[randidx]
        X = X[randidx,:]
        # the classifier, accounting for unbalanced classes
        text_clf = LogisticRegression(class_weight='auto',dual=True)
        # the regularizer
        parameters = {'C': (10.**arange(-5,5,.5)).tolist()}
        # perform gridsearch to get the best regularizer
        gs_clf = GridSearchCV(text_clf, parameters, n_jobs=-1)
        gs_clf.fit(X,Y)
        print metrics.classification_report(Y,gs_clf.predict(X),target_names=data.keys())
        # dump classifier to pickle
        cPickle.dump({'classifier':gs_clf,'labels':data.keys()},open(self.folder+'/classifier.pickle','wb'),-1)


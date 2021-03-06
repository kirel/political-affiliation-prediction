# -*- coding: utf-8 -*-
import cPickle
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d
import os
from scipy.sparse import vstack
from numpy.random import permutation
from sklearn.linear_model import LogisticRegression
from sklearn.grid_search import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn import metrics
from time import sleep
from vectorizer import Vectorizer
from downloader import get_speech_text

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
        # load Bag-of-Word extractor
        self.bow_vectorizer = Vectorizer(self.folder)
        # if there is no classifier file or training is invoked
        if (not os.path.isfile(self.folder+'/classifier.pickle')) or train:
            print 'Training classifier'
            self.train()
        print 'Loading classifier'
        clfdict = cPickle.load(open(self.folder+'/classifier.pickle'))
        self.clf = clfdict['classifier']
        self.parties = clfdict['labels']

    def predict(self,text):
        '''
        Loads scikit-learn Bag-of-Word extractor and classifier and
        applies it to some text. 

        INPUT
        text    a string to assign to a party
        folder  the folder containing the classifier and bag-of-words transformer pickles
        
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
        if type(text) is not list:
            text = [text]
        return self.bow_vectorizer.transform(text)
   
    def train(self,folds = 2):
        '''
        trains a classifier on the bag of word vectors extracted with extract_bundestag speeches.py

        INPUT
        folder  the folder to store the model file and load the bag-of-words-vectorizer file
        folds   number of cross-validation folds for optimizing the regularizer of the classifier

        '''
        try:
            # load the data
            data = get_speech_text(folder=self.folder)
            for key in data:
                data[key] = self.bow(data[key])
        except:
            print('Could not load text data file in\n' + \
                  'Try executing [python downloader.py --download --parse]')
            raise
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
        parameters = {'C': (10.**arange(-5,5,1.)).tolist()}
        # perform gridsearch to get the best regularizer
        gs_clf = GridSearchCV(text_clf, parameters, cv=folds, n_jobs=-1,verbose=2)
        gs_clf.fit(X,Y)
        print "Classifier reached mean %0.2f accuracy with regularizer: %f"%(gs_clf.best_score_, gs_clf.best_params_['C'])
        # dump classifier to pickle
        cPickle.dump({'classifier':gs_clf,'labels':data.keys()},open(self.folder+'/classifier.pickle','wb'),-1)


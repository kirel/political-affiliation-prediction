# -*- coding: utf-8 -*-
import re
import urllib2
import cPickle
from bs4 import BeautifulSoup
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import glob
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d, corrcoef, array
from scipy.stats.mstats import zscore
from scipy.sparse import vstack
from numpy.random import permutation
from sklearn.linear_model import LogisticRegression
from sklearn.grid_search import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn import metrics
from classifier import *
from sklearn.preprocessing import LabelBinarizer

def test_with_nested_CV(folder='model',folds=4, plot=False):
    '''
    
    Evaluates the classifer by doing nested CV 
    i.e. keeping 1/folds of the data out of the training and doing training 
    (including model selection for regularizer) on the training set and testing
    on the held-out data
    
    Also prints some stats and figures
    
    INPUT
    folder  folder with model files
    folds   number of folds

    '''
    # load data
    data = cPickle.load(open(folder+'/BoW.pickle'))
    # create numerical labels
    Y = hstack(map((lambda x: ones(data[data.keys()[x]].shape[0])*x),range(len(data))))
    # create data matrix
    X = vstack(data.values())
    # permute data 
    fsize = len(Y)/folds
    randidx = permutation(len(Y))
    Y = Y[randidx]
    X = X[randidx,:]
    idx = reshape(arange(fsize*folds),(folds,fsize))
    Y = Y[:fsize*folds]
    # allocate matrices for predictions
    predicted = zeros(fsize*folds)
    predicted_prob = zeros((fsize*folds,len(data)))
        
    # the regularization parameters to choose from 
    parameters = {'C': (10.**arange(-4,4,.5)).tolist()}
    
    # do nested CV
    for ifold in range(folds):
        testidx = idx[ifold,:]
        trainidx = idx[setdiff1d(arange(folds),ifold),:].flatten()
        text_clf = LogisticRegression(class_weight='auto',dual=True)
        gs_clf = GridSearchCV(text_clf, parameters, n_jobs=-1)
        gs_clf.fit(X[trainidx,:],Y[trainidx])
        predicted[testidx] = gs_clf.predict(X[testidx,:])
        predicted_prob[testidx,:] = gs_clf.predict_proba(X[testidx,:])
        print '************ Fold %d *************'%(ifold+1)
        print metrics.classification_report(Y[testidx], predicted[testidx],target_names=data.keys()) 
    
    # extract some metrics
    print '********************************'
    print '************ Total *************'
    print '********************************'
    report = metrics.classification_report(Y, predicted,target_names=data.keys())
    # dump metrics to file
    open(folder+'/report.txt','wb').write(report)
    print(report)
    print(metrics.confusion_matrix(Y,predicted))
    
    if plot:
        # print confusion matrix
        import pylab
        pylab.figure(figsize=(16,16))
        pylab.imshow(metrics.confusion_matrix(Y,predicted),interpolation='nearest')
        pylab.colorbar()
        pylab.xticks(arange(4),[x.decode('utf-8') for x in data.keys()])
        pylab.yticks(arange(4),[x.decode('utf-8') for x in data.keys()])
        pylab.xlabel('Predicted')
        pylab.ylabel('True')
        font = {'family' : 'normal', 'size'   : 30}
        pylab.rc('font', **font)
        pylab.savefig(folder+'/conf_mat.pdf',bbox_inches='tight')

def word_party_correlations(folder='model'):
    # load data
    data = cPickle.load(open(folder+'/BoW.pickle'))
    # create numerical labels
    Y = hstack(map((lambda x: ones(data[data.keys()[x]].shape[0])*x),range(len(data))))
    # create data matrix
    X = vstack(data.values())
    
    # load BoW vectorizers
    vctpickle = cPickle.load(open(folder+'/BoW_transformer.pickle'))
    vct = vctpickle['count_vectorizer']

    # compute label-BoW-tfidf-feature correlation
    lb = LabelBinarizer()
    partylabels = zscore(lb.fit_transform(Y),axis=0)
    wordidx2word = dict(zip(vct.vocabulary_.values(),vct.vocabulary_.keys()))
    allcors = dict(zip(data.keys(),[[]]*len(data.keys())))
    # this is extremely cumbersome and slow, ...
    # but computing the correlations naively on the matrices
    # requires densifying the matrix X, which is memory intense
    for partyidx in range(len(data.keys())):
        cors_words = []
        print 'Computing correlations for %s'%data.keys()[partyidx]
        for wordidx in range(X.shape[-1]):
            cors = corrcoef(X[:,wordidx].todense().flatten(),partylabels[:,partyidx])[1,0]
            if abs(cors)>.01:
                cors_words.append((wordidx2word[wordidx],cors))
        allcors[data.keys()[partyidx]] = dict(cors_words)   
    fn = folder+'/words_correlations.json' 
    json.dump(dict(allcors),open(fn,'wb'))


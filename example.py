# -*- coding: utf-8 -*-
import re
import urllib2
import cPickle
from bs4 import BeautifulSoup
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
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
from vectorizer import Vectorizer
from newsreader import load_sentiment
import codecs
from itertools import chain
from downloader import get_speech_text

def optimize_bow(folder='model'):
    steps = [['stemming','trigrams','tfidf'],\
             ['stemming','trigrams'],\
             ['trigrams','tfidf'],\
             ['trigrams'],\
             ['stemming','bigrams','tfidf'],\
             ['stemming','bigrams'],\
             ['bigrams','tfidf'],\
             ['bigrams'],\
             ['stemming','unigrams','tfidf'],\
             ['stemming','unigrams'],\
             ['unigrams','tfidf'],\
             ['unigrams'],\
             ['hashing'],\
             ]
    for trysteps in steps:
        print 'Trying %s'%'_'.join(sorted(trysteps))
        test_with_nested_CV(folder=folder,steps=trysteps)

def test_with_nested_CV(folder='model',folds=5, plot=True, steps=['hashing','tfidf']):
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
    # start timer
    import time
    t0 = time.time()
    # create bag of words representations
    vv = Vectorizer(steps=steps)

    # load data
    vec = Vectorizer(folder=folder)
    data = get_speech_text(folder=folder)
    for key in data.keys():
        data[key] = vec.transform(data[key])
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
    parameters = {'C': (10.**arange(-4,4,1.)).tolist()}
    
    # do nested CV
    for ifold in range(folds):
        testidx = idx[ifold,:]
        trainidx = idx[setdiff1d(arange(folds),ifold),:].flatten()
        text_clf = LogisticRegression(class_weight='auto',dual=True)
        # for nested CV, do folds-1 CV for parameter optimization
        # within inner CV loop and use the outer testfold as held-out data
        # for model validation
        gs_clf = GridSearchCV(text_clf, parameters, n_jobs=-1, cv=(folds-1))
        gs_clf.fit(X[trainidx,:],Y[trainidx])
        predicted[testidx] = gs_clf.predict(X[testidx,:])
        predicted_prob[testidx,:] = gs_clf.predict_proba(X[testidx,:])
        print '************ Fold %d *************'%(ifold+1)
        print metrics.classification_report(Y[testidx], predicted[testidx],target_names=data.keys()) 
    
    t1 = time.time()
    total_time = t1 - t0
    timestr = 'Wallclock time: %f sec\n'%total_time
    dimstr = 'Vocabulary size: %d\n'%X.shape[-1]
    report = timestr + dimstr
    # extract some metrics
    print '********************************'
    print '************ Total *************'
    print '********************************'
    report += metrics.classification_report(Y, predicted,target_names=data.keys())
    # dump metrics to file
    open(folder+'/report_%s.txt'%'_'.join(sorted(steps)),'wb').write(report)
    print(report)
    conf_mat = metrics.confusion_matrix(Y,predicted)
    open(folder+'/conf_mat_%s.txt'%'_'.join(sorted(steps)),'wb').write(json.dumps(conf_mat.tolist()))
    print(conf_mat)
    
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
    stopwords = codecs.open("stopwords.txt", "r", "utf-8").readlines()[5:]
    stops = map(lambda x:x.lower().strip(),stopwords)

    # using now stopwords and filtering out digits
    bow = TfidfVectorizer(min_df=2)
    datafn = folder+'/textdata/rawtext.pickle'
    data = cPickle.load(open(datafn))
    bow = bow.fit(chain.from_iterable(data.values()))

    # create numerical labels
    Y = hstack(map((lambda x: ones(len(data[data.keys()[x]]))*x),range(len(data))))
    
    # create data matrix
    for key in data.keys():
        data[key] = bow.transform(data[key])
    
    X = vstack(data.values())
    
    # map sentiment vector to bow space
    words = load_sentiment()
    sentiment_vec = zeros(X.shape[1])
    for key in words.keys():
        if bow.vocabulary_.has_key(key):
            sentiment_vec[bow.vocabulary_[key]] = words[key]
 
    # do sentiment analysis
    sentiments = X.dot(sentiment_vec)    

    # compute label-BoW-tfidf-feature correlation
    lb = LabelBinarizer()
    partylabels = zscore(lb.fit_transform(Y),axis=0)
    # sentiment  vs party correlation
    sentVsParty = corrcoef(partylabels.T,sentiments)[-1,:-1]
    fn = folder+'/sentiment_vs_party.json'
    
    for key in range(len(data.keys())):
        print "Sentiment vs Party %s: %0.2f"%(data.keys()[key],sentVsParty[key])
    
    json.dump(dict(zip(data.keys(),sentVsParty)),open(fn,'wb'))
 
    wordidx2word = dict(zip(bow.vocabulary_.values(),bow.vocabulary_.keys()))
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


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
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d, corrcoef, array, mean
from scipy.stats.mstats import zscore
from scipy.sparse import vstack
from numpy.random import permutation
from sklearn.linear_model import LogisticRegression,SGDClassifier
from sklearn.grid_search import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn import metrics
from classifier import *
from sklearn.preprocessing import LabelBinarizer
from vectorizer import Vectorizer
from newsreader import load_sentiment
import codecs
from itertools import chain
from downloader import *
from partyprograms import *
import pdb

def optimize_bow_binary(folder='model'):
    steps = [['stemming','unigrams','tfidf'],\
             ['stemming','unigrams'],\
             ['unigrams'],\
             ['hashing'],\
             ['hashing','tfidf']
             ]
    cleaning = [[],['stopwords'],\
                ['stopwords','unterbrechung'], \
                ['stopwords','abgeordnete'],\
                ['stopwords', 'unterbrechung', 'abgeordnete']]

    for trysteps in steps:
        for trycleaning in cleaning:
            print 'Trying BOW-vectorizer %s'%'_'.join(sorted(trysteps+trycleaning))
            test_with_nested_CV_binary(folder=folder,steps=trysteps,cleaning=trycleaning)


def optimize_bow(folder='model'):
    steps = [['stemming','unigrams','tfidf'],\
             ['stemming','unigrams'],\
             ['unigrams'],\
             ['hashing'],\
             ['hashing','tfidf']
             ]
    cleaning = [[],['stopwords'],\
                ['stopwords','unterbrechung'], \
                ['stopwords','abgeordnete'],\
                ['stopwords', 'unterbrechung', 'abgeordnete']]

    for trysteps in steps:
        for trycleaning in cleaning:
            print 'Trying BOW-vectorizer %s'%'_'.join(sorted(trysteps+trycleaning))
            test_with_nested_CV(folder=folder,steps=trysteps,cleaning=trycleaning)

def test_with_nested_CV_binary(folder='model',folds=4, plot=True, \
        steps=['hashing','tfidf'],cleaning=['stopwords','unterbrechung', 'abgeordnete']):
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
    if 'stopwords' in cleaning and 'abgeordnete' in cleaning : 
        stops=get_stops(includenames=True)
    elif 'stopwords' in cleaning: 
        stops=get_stops(includenames=False)
    else: stops=[]

    # start timer
    import time
    t0 = time.time()

    # load data
    vec = Vectorizer(folder=folder,steps=steps,train=True)
    data = get_speech_text(folder=folder, force_parse=True)
    programs = get_partyprograms(folder=folder)
    for key in data.keys():
        data[key] = vec.transform([clean(txt, folder=folder,\
                    stopwords=stops, \
                    remove_unterbrechung='unterbrechung' in cleaning)\
                    for txt in data[key]])
        programs[key] = vec.transform([clean(txt, folder=folder,\
                    stopwords=stops,\
                    remove_unterbrechung=False)\
                    for txt in programs[key]])

    # create numerical labels
    labels = {'linke':-1,'cdu':1,'gruene':-1,'spd':1} 
    Y = hstack(map((lambda x: ones(data[x].shape[0])*labels[x]),data.keys()))
    # create data matrix
    X = vstack(data.values())
    
    # create numerical labels for partyprograms (i.e. test data)
    Y_test = hstack(map((lambda x: ones(programs[x].shape[0])*labels[x]),programs.keys()))
    # create data matrix for partyprograms
    X_test = vstack(programs.values())

    # permute data 
    fsize = len(Y)/folds
    randidx = permutation(len(Y))
    Y = Y[randidx]
    X = X[randidx,:]
    idx = reshape(arange(fsize*folds),(folds,fsize))
    Y = Y[:fsize*folds]
    # allocate matrices for predictions
    predicted = zeros(fsize*folds)
    predicted_prob = zeros((fsize*folds,2))
        
    # the regularization parameters to choose from 
    parameters = {'C': (10.**arange(-2,4,1.)).tolist()}
    #parameters = {'alpha': (10.**arange(-4,4,4.)).tolist()}
    print "Starting Binary Nested Cross-Validation on %d folds"%folds
    # do nested CV
    for ifold in range(folds):
        testidx = idx[ifold,:]
        trainidx = idx[setdiff1d(arange(folds),ifold),:].flatten()
        #text_clf = SGDClassifier(loss='log',verbose=3,class_weight='auto')
        text_clf = LogisticRegression(class_weight='auto',solver='lbfgs',multi_class='multinomial')
        # for nested CV, do folds-1 CV for parameter optimization
        # within inner CV loop and use the outer testfold as held-out data
        # for model validation
        gs_clf = GridSearchCV(text_clf, parameters, n_jobs=-1, cv=(folds-1),verbose=3)
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
    report += '\nAccuracy %f\n'%mean(Y == predicted)
    # test on partyprogram data
    report +='Test on partyprograms [Binary]\n' 
    report += metrics.classification_report(Y_test, gs_clf.predict(X_test),target_names=data.keys())
    report += '\nAccuracy %f\n'%mean(Y_test == gs_clf.predict(X_test)) 
    # dump metrics to file
    open(folder+'/report_binary_%s.txt'%'_'.join(sorted(steps+cleaning)),'wb').write(report)
    print(report)
    conf_mat = metrics.confusion_matrix(Y,predicted)
    open(folder+'/conf_mat_binary_%s.txt'%'_'.join(sorted(steps+cleaning)),'wb').write(json.dumps(conf_mat.tolist()))
    print(conf_mat)
   
    if plot:
        # print confusion matrix
        import pylab
        pylab.figure(figsize=(16,16))
        pylab.imshow(metrics.confusion_matrix(Y,predicted),interpolation='nearest')
        pylab.colorbar()
        labels = ['opposition','regierung']
        pylab.xticks(arange(2),[x for x in labels])
        pylab.yticks(arange(2),[x for x in labels])
        pylab.xlabel('Predicted')
        pylab.ylabel('True')
        font = {'family' : 'normal', 'size'   : 30}
        pylab.rc('font', **font)
        pylab.savefig(folder+'/conf_mat_binary_%s.pdf'%'_'.join(sorted(steps+cleaning)),bbox_inches='tight')


def test_with_nested_CV(folder='model',folds=5, plot=True, \
        steps=['hashing','tfidf'],cleaning=['stopwords','unterbrechung', 'abgeordnete']):
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
    if 'stopwords' in cleaning and 'abgeordnete' in cleaning : 
        stops=get_stops(includenames=True)
    elif 'stopwords' in cleaning: 
        stops=get_stops(includenames=False)
    else: stops=[]

    # start timer
    import time
    t0 = time.time()

    # load data
    vec = Vectorizer(folder=folder,steps=steps,train=True)
    data = get_speech_text(folder=folder, force_parse=True)
    programs = get_partyprograms(folder=folder)
    for key in data.keys():
        data[key] = vec.transform([clean(txt, folder=folder,\
                    stopwords=stops, \
                    remove_unterbrechung='unterbrechung' in cleaning)\
                    for txt in data[key]])
        programs[key] = vec.transform([clean(txt, folder=folder,\
                    stopwords=stops,\
                    remove_unterbrechung=False)\
                    for txt in programs[key]])

    # create numerical labels
    Y = hstack(map((lambda x: ones(data[data.keys()[x]].shape[0])*x),range(len(data))))
    # create data matrix
    X = vstack(data.values())
    
    # create numerical labels for partyprograms (i.e. test data)
    Y_test = hstack(map((lambda x: ones(programs[data.keys()[x]].shape[0])*x),range(len(programs))))
    # create data matrix for partyprograms
    X_test = vstack(programs.values())

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
    #parameters = {'alpha': (10.**arange(-4,4,4.)).tolist()}
    print "Starting Nested Cross-Validation on %d folds"%folds
    # do nested CV
    for ifold in range(folds):
        testidx = idx[ifold,:]
        trainidx = idx[setdiff1d(arange(folds),ifold),:].flatten()
        #text_clf = SGDClassifier(loss='log',verbose=3,class_weight='auto')
        text_clf = LogisticRegression(class_weight='auto',solver='lbfgs',multi_class='multinomial')
        # for nested CV, do folds-1 CV for parameter optimization
        # within inner CV loop and use the outer testfold as held-out data
        # for model validation
        gs_clf = GridSearchCV(text_clf, parameters, n_jobs=-1, cv=(folds-1),verbose=3)
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
    # test on partyprogram data
    report +='Test on partyprograms\n' 
    report += metrics.classification_report(Y_test, gs_clf.predict(X_test),target_names=data.keys())
    
    # dump metrics to file
    open(folder+'/report_%s.txt'%'_'.join(sorted(steps+cleaning)),'wb').write(report)
    print(report)
    conf_mat = metrics.confusion_matrix(Y,predicted)
    open(folder+'/conf_mat_%s.txt'%'_'.join(sorted(steps+cleaning)),'wb').write(json.dumps(conf_mat.tolist()))
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


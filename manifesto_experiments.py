# -*- coding: utf-8 -*-
import re
import urllib2
import cPickle
from bs4 import BeautifulSoup
import json
import operator
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import glob
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d, corrcoef, array, mean, sign, double
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
import pdb
from manifestoproject import *
from downloader import get_stops

def optimize_bow_binary(folder='manifestoproject'):
    steps = [['stemming','unigrams','tfidf'],\
             ['stemming','unigrams'],\
             ['unigrams'],\
             ['hashing'],\
             ['hashing','tfidf']
             ]

    for trysteps in steps:
        print 'Trying BOW-vectorizer %s'%'_'.join(sorted(trysteps))
        test_with_nested_CV(folder=folder,steps=trysteps,binary=True)


def optimize_bow(folder='manifestoproject'):
    steps = [['stemming','unigrams','tfidf'],\
             ['stemming','unigrams'],\
             ['unigrams'],\
             ['hashing'],\
             ['stemming','bigrams','tfidf']
             ]
    for trysteps in steps:
        print 'Trying BOW-vectorizer %s'%'_'.join(sorted(trysteps))
        test_with_nested_CV(folder=folder,steps=trysteps,binary=False)

def test_with_nested_CV(folder='manifestoproject',folds=3, plot=True, \
        steps=['unigram'],binary=True):
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

    # load data
    vec = Vectorizer(folder=folder,steps=steps,train=True)
    data = get_text(folder=folder)
  
    for key in data.keys():
        data[key] = vec.transform(data[key])

    # create numerical labels
    if binary:
        Y = hstack(map((lambda x: ones(data[x].shape[0])*right_left_features(x)),data.keys()))
    else: 
        Y = hstack(map((lambda x: ones(data[x].shape[0])*double(x)),data.keys()))

    # create data matrix
    X = vstack(data.values())
    
    invalid = Y == 0
    Y = Y[~invalid]
    X = X[~invalid,:]

    # permute data 
    fsize = len(Y)/folds
    randidx = permutation(len(Y))
    Y = Y[randidx]
    X = X[randidx,:]
    idx = reshape(arange(fsize*folds),(folds,fsize))
    Y = Y[:fsize*folds]
    # allocate matrices for predictions
    predicted = zeros(fsize*folds)
    predicted_prob = zeros((fsize*folds,len(unique(Y))))
        
    # the regularization parameters to choose from 
    parameters = {'C': (10.**arange(-2,4,1.)).tolist()}
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
        print metrics.classification_report(Y[testidx], predicted[testidx]) 
    
    t1 = time.time()
    total_time = t1 - t0
    timestr = 'Wallclock time: %f sec\n'%total_time
    dimstr = 'Vocabulary size: %d\n'%X.shape[-1]
    report = timestr + dimstr
    # extract some metrics
    print '********************************'
    print '************ Total *************'
    print '********************************'
    if binary:
        report += metrics.classification_report(Y, predicted)
    else:
        report += metrics.classification_report(Y, predicted,target_names=data.keys())
    report += '\nAccuracy %f\n'%mean(Y == predicted)
    
    # dump metrics to file
    suffix = '_%s.txt'%'_'.join(sorted(steps))
    if binary:
        open(folder+'/report_binary_'+suffix,'wb').write(report)
    else:
        open(folder+'/report_'+suffix,'wb').write(report)
    print(report)
    conf_mat = metrics.confusion_matrix(Y,predicted)
    if binary:
        open(folder+'/conf_mat_binary_'+suffix,'wb').write(json.dumps(conf_mat.tolist()))
    else:
        open(folder+'/conf_mat_'+suffix,'wb').write(json.dumps(conf_mat.tolist()))
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
        if binary:
            pylab.savefig(folder+'/conf_mat_binary_%s.pdf'%suffix,bbox_inches='tight')
        else:
            pylab.savefig(folder+'/conf_mat_%s.pdf'%suffix,bbox_inches='tight')

def word_party_correlations(folder='manifestoproject', steps=['unigram','tfidf']):
    # load data
    vec = Vectorizer(folder=folder,steps=steps,train=True)
    data = get_speech_text(folder=folder, force_parse=True)
    stops=get_stops(includenames=True)
    bow = vec.processors['count_vectorizer']
    
    # create numerical labels
    Y = hstack(map((lambda x: ones(len(data[data.keys()[x]]))*x),range(len(data))))
    
    # create data matrix
    for key in data.keys():
        data[key] = vec.transform([clean(txt, folder=folder,\
                    stopwords=stops, \
                    remove_unterbrechung=True)\
                    for txt in data[key]])
    
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
    partylabels = sign(lb.fit_transform(Y) - 0.5)
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

def plot_sentiments(folder='manifestoproject'):
    fn = folder+'/sentiment_vs_party.json'
    sentiments = json.loads(open(fn).read())
    xlabels = {
                'linke': u'Linke\n(64 seats)',
                'gruene': u'Grüne\n(63 seats)',
                'spd':'SPD\n(193 seats)',
                'cdu':'CDU/CSU\n(311 seats)'
                }
    # print confusion matrix
    import pylab
    seats = array([64,63,193,311])
    print corrcoef(seats,array(sentiments.values()))
    pylab.figure(figsize=(8,6))
    sentiments = dict(sorted(sentiments.items(), key=operator.itemgetter(1)))
    pylab.bar(range(len(sentiments)),sentiments.values(),width=.8,color=['purple', 'green', 'red','black'])
    pylab.xlim(-.2,4)
    pylab.yticks(arange(-.2,.3,.1))
    pylab.xticks(arange(len(sentiments)) + .5,[xlabels[x] for x in sentiments.keys()])
    pylab.ylabel('Sentiment')
    font = {'family' : 'normal', 'size'   : 16}
    pylab.rc('font', **font)
    pylab.savefig(folder+'/party_sentiments.pdf',bbox_inches='tight')

def list_top_words(folder='manifestoproject',topwhat=20):
    import pylab
    fn = folder+'/words_correlations.json'
    cors = json.loads(open(fn).read())
    colors = {'linke':'purple','gruene':'green','spd':'red','cdu':'black'}
    partyName = {'linke':'Linke','gruene':u'Grüne','spd':'SPD','cdu':'CDU/CSU'}
    cors = {key:sorted(cors[key].items(), key=operator.itemgetter(1)) for key in cors.keys()}
    for party in cors.keys():
        pylab.figure(figsize=(3,12))
        tmp = cors[party][:topwhat] + [('...',0)] +  cors[party][-topwhat:]
        words = [x[0] for x in tmp]
        wordcors = [x[1] for x in tmp]

        pylab.barh(arange(len(words)),wordcors,color=colors[party])
        pylab.yticks(arange(len(words)),words)
        pylab.ylim(-.2,len(words))
        lim = max(abs(array(wordcors))) * 1.1
        pylab.xlim(-lim,lim)
        pylab.xticks(array([-.2,0,.2]))
        pylab.title(partyName[party])
        pylab.xlabel('Correlation')
        font = {'family' : 'normal', 'size'   : 16}
        pylab.rc('font', **font)
        pylab.savefig(folder+'/party_word_correlations-%s.pdf'%party,bbox_inches='tight')

       


# -*- coding: utf-8 -*-
import json
import re
import datetime
import os
import urllib2
import cPickle
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import glob
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d,array,zeros,eye,argmax,percentile
from scipy.sparse import vstack
from numpy.random import permutation
import codecs

def get_news(sources=['spiegel','faz','welt','zeit','sz'], folder='model'):
    '''
    Collects all news articles from political ressort of major German newspapers
    Articles are transformed to BoW vectors and assigned to a political party
    For better visualization, articles' BoW vectors are also clustered into topics

    INPUT
    folder      the model folder containing classifier and BoW transformer
    sources     a list of strings for each newspaper for which a crawl is implemented
                default ['zeit','sz']

    '''
    import classifier
    from api import fetch_url
    
    news = dict([(source,[]) for source in sources])  
    # the classifier for prediction of political affiliation
    clf = classifier.Classifier(folder=folder)
    
    for source in sources:

        if source is 'spiegel':
            # fetching articles from sueddeutsche.de/politik
            url = 'http://www.spiegel.de/politik'
            site = BeautifulSoup(urllib2.urlopen(url).read())
            titles = site.findAll("div", { "class" : "teaser" })
            urls = ['http://www.spiegel.de'+a.findNext('a')['href'] for a in titles]
         
        if source is 'faz':
            # fetching articles from sueddeutsche.de/politik
            url = 'http://www.faz.net/aktuell/politik'
            site = BeautifulSoup(urllib2.urlopen(url).read())
            titles = site.findAll("a", { "class" : "TeaserHeadLink" })
            urls = ['http://www.faz.net'+a['href'] for a in titles]
         
        if source is 'welt':
            # fetching articles from sueddeutsche.de/politik
            url = 'http://www.welt.de/politik'
            site = BeautifulSoup(urllib2.urlopen(url).read())
            titles = site.findAll("a", { "class" : "as_teaser-kicker" })
            urls = [a['href'] for a in titles]
         
        if source is 'sz':
            # fetching articles from sueddeutsche.de/politik
            url = 'http://www.sueddeutsche.de/politik'
            site = BeautifulSoup(urllib2.urlopen(url).read())
            titles = site.findAll("div", { "class" : "teaser" })
            urls = [a.findNext('a')['href'] for a in titles]
       
        if source is 'zeit':
            # fetching articles from zeit.de/politik
            url = 'http://www.zeit.de/politik'
            site = BeautifulSoup(urllib2.urlopen(url).read())
            titles = site.findAll("span", { "class" : "supertitle" })
            urls = [a.parent['href'] for a in titles if a.parent['href'].find('/2015-')>0]

        print "Found %d articles on %s"%(len(urls),url)
         
        # predict party from url for this source
        print "Predicting %s"%source
        articles = []
        for url in urls:
            try:
                title,text = fetch_url(url)
                prediction = clf.predict(text)
                prediction['url'] = url
                articles.append((title,prediction))
            except:
                print('Could not get text from %s'%url)
                pass

        news[source] = dict(articles)

    # save results
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    open(folder+'/news-%s'%(datestr) + '.json', 'wb').write(json.dumps(news))

def pairwise_distance(folder='model',nneighbors=100):
    '''

    Computes pairwise distances between bag-of-words vectors of articles

    INPUT
    folder      model folder
    nneighbors  number of closest neighbors to include in distance list

    '''
    import glob
    from sklearn.metrics.pairwise import pairwise_distances
    from vectorizer import Vectorizer
    # take most recent news file in model folder
    news = json.load(open(glob.glob(folder+'/news*.json')[-1]))
    # collect text data from all articles
    data,articles = [],[]
    for source in news.keys():
        for title,article in news[source].items():
            data.append(article['text'])
            predictions = [prediction['probability'] for prediction in article['prediction']]
            articles.append(
            {   'source':source,\
                'title':title,\
                'url':article['url'],\
                'prediction':article['prediction'],\
                'predictedLabel':article['prediction'][argmax(predictions)]['party']})
    # a bag-of-words transformer 
    
    # worked a bit on more stopwords - mainly filtering out html related noise
    stops = map(lambda x:x.lower().strip(),open(folder+'/stopwords.txt').readlines()[6:])

    # using now stopwords and filtering out digits
    bow = TfidfVectorizer(min_df=2,stop_words=stops)
    X = bow.fit_transform(data)
    print 'Computing pairwise distances' 
    K = pairwise_distances(X,metric='l2',n_jobs=-1)
    # collect closest neighbors
    distances = []
    for urlidx in range(len(data)):
        idx =  (K[urlidx,:]).argsort()[1:nneighbors+1]
        for sidx in idx:
            distances.append([urlidx,sidx,(idx==sidx).nonzero()[0][0]])

    result = {'articles':articles,'distances':distances}
    # save article with party prediction and distances to closest articles
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    open(folder+'/distances-%s'%(datestr)+'.json', 'wb').write(json.dumps(result))
    # also save that latest version for the visualization
    open(folder+'/../web/source/distances.json', 'wb').write(json.dumps(result))
    

def kpca_cluster(folder='model',nclusters=30,topwhat=10):
    '''

    Computes clustering of bag-of-words vectors of articles

    INPUT
    folder      model folder
    nclusters   number of clusters

    '''
    import glob
    from sklearn.metrics.pairwise import pairwise_distances
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.decomposition import KernelPCA
    from sklearn.cluster import KMeans
    from scipy.stats.mstats import zscore
    # take most recent news file in model folder
    news = json.load(open(glob.glob(folder+'/news*.json')[-1]))
    # collect text data from all articles
    data,articles = [],[]
    for source in news.keys():
        for title,article in news[source].items():
            data.append(article['text'])
            predictions = [prediction['probability'] for prediction in article['prediction']]
            articles.append(
            {   'source':source,\
                'title':title,\
                'url':article['url'],\
                'prediction':article['prediction'],\
                'predictedLabel':article['prediction'][argmax(predictions)]['party']})
    # a bag-of-words transformer 

    # worked a bit on more stopwords - mainly filtering out html related noise
    stops = map(lambda x:x.lower().strip(),open('model/stopwords.txt').readlines()[6:])

    # vectorize non-stopwords 
    bow = TfidfVectorizer(min_df=2,stop_words=stops)
    X = bow.fit_transform(data)

    # creating bow-index-to-word map
    idx2word = dict(zip(bow.vocabulary_.values(),bow.vocabulary_.keys()))

    # using now stopwords and filtering out digits
    print 'Computing pairwise distances' 
    K = pairwise_distances(X,metric='l2',n_jobs=-1)
    perc = 100./len(news)
    width = percentile(K.flatten(),perc)
    
    # KPCA transform bow vectors
    Xc = zscore(KernelPCA(n_components=nclusters,kernel='rbf',gamma=width).fit_transform(X))
    # compute clusters
    km = KMeans(n_clusters=nclusters).fit(Xc)
    Xc = km.predict(Xc)
    # cluster centers
    km.cluster_centers_
    
    distances = []
    for icluster in range(nclusters):
        nmembers = (Xc==icluster).sum()
        if nmembers < len(news)*2.0 and nmembers > 1:
            members = (Xc==icluster).nonzero()[0]
            topwordidx = array(X[members,:].sum(axis=0))[0].argsort()[-topwhat:][::-1]
            topwords = ' '.join([idx2word[wi] for wi in topwordidx])
            print 'Cluster %d'%icluster + ' %d members'%nmembers + '\n\t'+topwords
            articles.append(
            {   'source':'Cluster-%d'%icluster,\
                'title':topwords,\
                'url':'',\
                'prediction':articles[members[0]]['prediction'],\
                'predictedLabel':articles[members[0]]['predictedLabel']})
            
            for member in members:
                distances.append([len(articles)-1,member,1.])
        # a bag-of-words transformer 

    result = {'articles':articles,'distances':distances}
    # save article with party prediction and distances to closest articles
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    open(folder+'/distances-%s'%(datestr)+'.json', 'wb').write(json.dumps(result))
    # also save that latest version for the visualization
    open(folder+'/../web/source/distances.json', 'wb').write(json.dumps(result))
    
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(\
        description='Downloads, transforms and clusters news articles')

    parser.add_argument('-f','--folder',help='Folder to store text files [./model]',\
        default='model')

    parser.add_argument('-d','--download',help='If files should be downloaded',\
            action='store_true', default=False)
    
    parser.add_argument('-p','--pairwise',help='If pairwise distances of text should be computed',\
            action='store_true', default=False)
    
    parser.add_argument('-c','--cluster',help='If texts should be clustered',\
            action='store_true', default=False)
    
    args = vars(parser.parse_args())
    if not os.path.isdir(args['folder']):
        os.mkdir(args['folder']) 
    if args['download']:
        get_news(folder=args['folder'])
    if args['pairwise']:
        pairwise_distance(folder=args['folder'])
    if args['cluster']:
        kpca_cluster(folder=args['folder'])

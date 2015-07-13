# -*- coding: utf-8 -*-
from sklearn.decomposition import KernelPCA
from sklearn.metrics.pairwise import pairwise_distances
from scipy.stats.mstats import zscore
import glob
import json
import re
import datetime
import os
import cPickle
import codecs
import itertools
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d,array,zeros,eye,argmax,percentile

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
    from bs4 import BeautifulSoup
    from api import fetch_url
    import urllib2
    
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
         
        if source is 'sz-without-readability':
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

def all_saved_news(folder='model'):
    import glob
    from string import digits
    # get just the most recent news articles file (assuming date label ordering)
    news = json.load(open(glob.glob(folder+'/news*.json')[-1]))
    # collect text data from all articles
    articles, data = [], []
    for source in news.keys():
        for title, article in news[source].items():
            # remove numbers
            for d in digits: article['text'] = article['text'].replace(d,'')
            data.append(article['text'])
            predictions = [prediction['probability'] for prediction in article['prediction']]
            articles.append({
                'source':source,
                'title':title,
                'url':article['url'],
                'prediction':article['prediction'],
                'predictedLabel':article['prediction'][argmax(predictions)]['party']
            })
    return articles, data

def pairwise_dists(data, nneighbors=100, folder='model', dist='l2'):
    '''

    Computes pairwise distances between bag-of-words vectors of articles

    INPUT
    folder      model folder
    nneighbors  number of closest neighbors to include in distance list

    '''
    stopwords = codecs.open(folder+"/stopwords.txt", "r", "utf-8").readlines()[5:]
    stops = map(lambda x:x.lower().strip(),stopwords)

    # using now stopwords and filtering out digits
    bow = TfidfVectorizer(min_df=2,stop_words=stops)
    X = bow.fit_transform(data)
    print 'Computing %s pairwise distances'%dist
    # KPCA transform bow vectors
    if dist is 'l2_kpca_zscore':
        K = pairwise_distances(X,metric='l2',n_jobs=1)
        perc = 100./len(data)
        width = percentile(K.flatten(),perc)
        Xc = zscore(KernelPCA(n_components=50,kernel='rbf',gamma=width).fit_transform(X))
        K = pairwise_distances(Xc,metric='l2',n_jobs=1)
    elif dist is 'l2_kpca':
        K = pairwise_distances(X,metric='l2',n_jobs=1)
        perc = 100./len(data)
        width = percentile(K.flatten(),perc)
        Xc = KernelPCA(n_components=50,kernel='rbf',gamma=width).fit_transform(X)
        K = pairwise_distances(Xc,metric='l2',n_jobs=1)
    elif dist is 'l2':
        K = pairwise_distances(X,metric='l2',n_jobs=1)
    elif dist is 'l1':
        K = pairwise_distances(X,metric='l1',n_jobs=1)

    # collect closest neighbors
    distances = []
    for urlidx in range(len(data)):
        idx =  (K[urlidx,:]).argsort()[1:nneighbors+1]
        for sidx in idx:
            distances.append([urlidx,sidx,(idx==sidx).nonzero()[0][0]])

    return distances

def kpca_cluster(data,nclusters=100,ncomponents=50,topwhat=10,zscored=True):
    '''

    Computes clustering of bag-of-words vectors of articles

    INPUT
    folder      model folder
    nclusters   number of clusters

    '''
    from sklearn.cluster import KMeans
    # filtering out some noise words
    stops = map(lambda x:x.lower().strip(),open('model/stopwords.txt').readlines()[6:])

    # vectorize non-stopwords 
    bow = TfidfVectorizer(min_df=2,stop_words=stops)
    X = bow.fit_transform(data)

    # creating bow-index-to-word map
    idx2word = dict(zip(bow.vocabulary_.values(),bow.vocabulary_.keys()))

    # using now stopwords and filtering out digits
    print 'Computing pairwise distances' 
    K = pairwise_distances(X,metric='l2',n_jobs=1)
    perc = 100./len(data)
    width = percentile(K.flatten(),perc)

    # KPCA transform bow vectors
    Xc = KernelPCA(n_components=ncomponents,kernel='rbf',gamma=width).fit_transform(X)
    
    if zscored:
        Xc = zscore(Xc)
    
    # compute clusters
    km = KMeans(n_clusters=nclusters).fit(Xc)
    Xc = km.predict(Xc)

    clusters = []
    for icluster in range(nclusters):
        nmembers = (Xc==icluster).sum()
        if True:#nmembers < len(data) / 5.0 and nmembers > 1: # only group clusters big enough but not too big
            members = (Xc==icluster).nonzero()[0]
            topwordidx = array(X[members,:].sum(axis=0))[0].argsort()[-topwhat:][::-1]
            topwords = ' '.join([idx2word[wi] for wi in topwordidx])
            print 'Cluster %d'%icluster + ' %d members'%nmembers + '\n\t'+topwords

            clusters.append({
                'name':'Cluster-%d'%icluster,
                'description': topwords,
                'members': list(members)
                })

    return clusters

def party_cluster(articles):
    clusters = []
    keyf = lambda a: a[1]['predictedLabel']
    for k, group in itertools.groupby(sorted(enumerate(articles), key=keyf), keyf):
        clusters.append({
            'name': k,
            'description': k,
            'members': [index_article_tuple[0] for index_article_tuple in group]
            })

    return clusters

def write_distances_json(folder='model'):
    articles, data = all_saved_news(folder)
    dists = ['l2','l1','l2_kpca','l2_kpca_zscore']
    distances_json = {
            'articles': articles,
            'distances': [
                { 'name': dist, 'distances': pairwise_dists(data,dist = dist) } for dist in dists
            ],
            'clusterings': [
                { 'name': 'prediction', 'clusters': party_cluster(articles) },
                { 'name': 'kpca_nclusters_30_ncomponents_30_zscored', 'clusters': kpca_cluster(data,nclusters=30,ncomponents=30) },
                { 'name': 'kpca_nclusters_60_ncomponents_30_zscored', 'clusters': kpca_cluster(data,nclusters=60,ncomponents=30) },
                { 'name': 'kpca_nclusters_30_ncomponents_30', 'clusters': kpca_cluster(data,nclusters=30,zscored=False,ncomponents=30) },
                { 'name': 'kpca_nclusters_60_ncomponents_30', 'clusters': kpca_cluster(data,nclusters=60,zscored=False,ncomponents=30) },
                { 'name': 'kpca_nclusters_30_ncomponents_100_zscored', 'clusters': kpca_cluster(data,nclusters=30,ncomponents=100) },
                { 'name': 'kpca_nclusters_60_ncomponents_100_zscored', 'clusters': kpca_cluster(data,nclusters=60,ncomponents=100) },
                { 'name': 'kpca_nclusters_30_ncomponents_100', 'clusters': kpca_cluster(data,nclusters=30,zscored=False,ncomponents=100) },
                { 'name': 'kpca_nclusters_60_ncomponents_100', 'clusters': kpca_cluster(data,nclusters=60,zscored=False,ncomponents=100) }
            ]
        }

    # save article with party prediction and distances to closest articles
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    open(folder+'/distances-%s'%(datestr)+'.json', 'wb').write(json.dumps(distances_json))
    # also save that latest version for the visualization
    open(folder+'/../web/source/distances.json', 'wb').write(json.dumps(distances_json))

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(\
        description='Downloads, transforms and clusters news articles')

    parser.add_argument('-f','--folder',help='Folder to store text files [./model]',\
        default='model')

    parser.add_argument('-d','--download',help='If files should be downloaded',\
            action='store_true', default=False)

    parser.add_argument('-p','--distances',help='If pairwise distances of text should be computed',\
            action='store_true', default=False)
    
    args = vars(parser.parse_args())
    if not os.path.isdir(args['folder']):
        os.mkdir(args['folder']) 
    if args['download']:
        get_news(folder=args['folder'])
    if args['distances']:
        write_distances_json(folder=args['folder'])

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

def pairwise_distance(folder='model',nneighbors=1):
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
    stops = map(lambda x:x.lower().strip(),open('stopwords.txt').readlines()[6:])

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
    stops = map(lambda x:x.lower().strip(),open('stopwords.txt').readlines()[6:])

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
    
def get_files(url='http://www.bundestag.de/plenarprotokolle', \
                folder='model/textdata', \
                suffix='-data.txt'):
    '''
    
    Downloads files with transcribed speeches in german parliament
    
    INPUT 
    url     the base URL of the speeches
    folder  the folder to download the files to
    suffix  a suffix for the speeche files 
    '''
    if not os.path.isdir(folder+'/textdata'):
        os.mkdir(folder+'/textdata')
    # read the site content and parse the html tree
    site = urllib2.urlopen(url)
    html = site.read()
    soup = BeautifulSoup(html)
    # get the links
    list_urls = soup.find_all('a')
    # look for the suffix links and download the files
    for url in list_urls:
        if url.has_attr('href') and url['href'].find(suffix) > 0:
            remotefn = 'http://www.bundestag.de'+url['href']
            localfn = folder+'/textdata/'+url['href'].split('/')[-1]
            print 'Downloading %s to %s'%(remotefn,localfn)
            fh = open(localfn,'wb')
            fh.write(urllib2.urlopen(remotefn).read())
            fh.close()
        
def partyparse(folder='model', suffix='-data.txt', \
    parties = [{'name':'linke','searchpattern':'DIE LINKE'},\
                {'name':'spd','searchpattern':'SPD'},\
                {'name':'gruene','searchpattern':'90/DIE'},\
                {'name':'cdu','searchpattern':'CDU/CSU'}]):
    '''
    
    Loops through files and collects text data for each party
    Stores text of all speeches in {partyname:list_of_speech_strs} dict

    INPUT
    folder  the folder of the textfiles
    suffix  
    parties list of substrings of parties to look for (had issues with umlauts of gruenen)
    '''
    import os
    
    # a file handle to store the speech preamble, serving as label 
    # check for existing file and remove if found
    if os.path.isfile(folder+'/textdata/speech_labels.txt'):
        os.remove(folder+'/textdata/speech_labels.txt')
    
    speechlabelsfh = codecs.open(folder+'/textdata/speech_labels.txt','wb',encoding='latin_1')
    speechlabelsfh.write('String|Party\n')
    
    # find all files with suffix
    files = glob.glob(folder+'/textdata/*'+suffix)

    data = {x['name']:[] for x in parties}
    print 'Parsing %d files'%len(files) 
    # go through files
    for f in files:
        fh = codecs.open(f,'r','latin_1')
        txt = fh.read()
        fh.close() 
        # each speech is preceded by a pattern like "speaker (partyname):"
        # we simply look for '():'
        party = re.findall("\([^\(^\)]*\):",txt)
        text = re.split("\([^\(^\)]*\):",txt)

        for txtidx in range(len(party)):
            # look for party in this text-preamble
            foundparty = '-'
            for pa in parties:
                # if we find a party-substring in this preamble
                # take the speech to be of that party and store the label
                if pa['searchpattern'].decode('utf-8').lower() in party[txtidx].lower():
                    foundparty = pa['name']
                    pa['name']
                    data[pa['name']].append(text[txtidx+1].lower())
            # write out which party was found for this speech
            speechlabelsfh.write('%s:%s\n'%(party[txtidx],foundparty))   
    # store the preamble-party associations
    speechlabelsfh.close()
    # store the data
    fn = folder+'/textdata/rawtext.pickle'
    print 'Saving raw text to %s'%fn
    cPickle.dump(data,open(fn,'wb'),-1)

def txt2BoW(folder='model'):
    '''

    Transforms strings of each speach into Bag-of-Words vectors, with tf-idf normalization

    INPUT
    folder  the folder of the raw text pickle file from partyparse function

    '''

    # train or load vectorizer
    # training a new vectorizer will store the BoW'd data
    from vectorizer import Vectorizer
    vect = Vectorizer(folder=folder)
   
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(\
        description='Downloads, parses and transforms parliament speech text files')

    parser.add_argument('-u','--url', help='URL for speeches [http://www.bundestag.de/plenarprotokolle]',default='http://www.bundestag.de/plenarprotokolle')

    parser.add_argument('-s','--suffix',\
        help='Suffix for speech files [-data.txt]',\
        default='-data.txt')

    parser.add_argument('-f','--folder',help='Folder to store text files [./textdata]',\
        default='model')

    parser.add_argument('-d','--download',help='If files should be downloaded',\
            action='store_true', default=False)
    parser.add_argument('-p','--parse',help='If files should be parsed into different parties',\
            action='store_true', default=False)
    parser.add_argument('-t','--transform',help='If texts should be bag-of-word transformed',\
            action='store_true', default=False)
    
    args = vars(parser.parse_args())
    if not os.path.isdir(args['folder']):
        os.mkdir(args['folder']) 
    if args['download']:
        get_files(folder=args['folder'],suffix=args['suffix'],url=args['url'])
    if args['parse']:
        partyparse(folder=args['folder'],suffix=args['suffix']) 
    if args['transform']:
        txt2BoW(folder=args['folder'])

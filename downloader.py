# -*- coding: utf-8 -*-
import json
import re
import datetime
import os
import urllib2
import cPickle
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import glob
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d,array
from scipy.sparse import vstack
from numpy.random import permutation
import codecs

def get_news(sources=['spiegel','faz','welt','zeit','sz'], folder='model', clusters=10, topwords=100):
    '''
    Collects all news articles from political ressort of major German newspapers
    Articles are transformed to BoW vectors and assigned to a political party
    For better visualization, articles' BoW vectors are also clustered into topics

    INPUT
    folder      the model folder containing classifier and BoW transformer
    sources     a list of strings for each newspaper for which a crawl is implemented
                default ['zeit','sz']
    clusters    number of clusters for topic modelling (default 20)
    topwords    number of words for representing a cluster center (default 100)

    '''
    import classifier
    from sklearn.cluster import MiniBatchKMeans 
    result = {'topics':[],'predictions':{}}
    
    # the classifier for prediction of political affiliation
    clf = classifier.Classifier(folder=folder)
    
    # a topic model using vanilla sgd kmeans
    km = MiniBatchKMeans(n_clusters=clusters)
    
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
        result['predictions'][source] = dict([(url,clf.predict_url(url)) for url in urls])
            
        # Training topic clusters for each source 
        print "Fitting topics on %s"%source
        # extract text of all articles into BoW and train cluster model 
        data = [a['text'] for a in result['predictions'][source].values()]
        bow = clf.BoW['tfidf_transformer'].transform(clf.BoW['count_vectorizer'].transform([text.lower() for text in data]))
        km.fit(bow)
    
    clusterstats = zeros((2,clusters))
    # Now that the clusters are fit, we assign articles to topics
    for source in result['predictions'].keys():
        for item in result['predictions'][source].keys():
            # store the distance of this article from the cluster center
            result['predictions'][source][item]['cluster_distance'] = \
                km.transform(clf.bow(result['predictions'][source][item]['text']))\
                    .flatten().tolist()
            # store the topic/cluster assignment itself
            result['predictions'][source][item]['clusters'] = \
                km.predict(clf.bow(result['predictions'][source][item]['text']))\
                    .flatten().tolist()
            # collect the total number of articles in a cluster 
            clusterstats[0,result['predictions'][source][item]['clusters']] += 1
            # collect the distance of all articles in a cluster
            clusterstats[1,:] =+ array(result['predictions'][source][item]['cluster_distance'])
    print 'Fitted %d clusters to %d articles'%(clusters,clusterstats.sum(axis=1)[0])
    
    # transform word to BoW index into reverse lookup table
    wordidx2word = dict(zip(clf.BoW['count_vectorizer'].vocabulary_.values(),clf.BoW['count_vectorizer'].vocabulary_.keys()))
    # save cluster centers and top words
    for cluster in range(clusters):
        thiscluster = dict()
        thiscluster['id'] = cluster
        wordidx = reversed(km.cluster_centers_[cluster,:].argsort()[-topwords:])
        thiscluster['topwords'] = [wordidx2word[idx] for idx in wordidx]
        thiscluster['assignments'] = clusterstats[0,cluster].flatten().tolist()
        dist = clusterstats[1,cluster]/clusterstats[0,cluster]
        thiscluster['mean_distance'] = dist.flatten().tolist()
        result['topics'].append(thiscluster)
        print 'Topic %s, %d articles'%(' '.join(thiscluster['topwords'][:3]),thiscluster['assignments'][0])
    
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    with open(folder+'/newsresults-%s'%(datestr) + '.json', 'wb') as fp:
        json.dump(result, fp)
    
    return result

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
    from itertools import chain
    fn = folder+'/textdata/rawtext.pickle'
    print 'Loading %s'%fn
    data = cPickle.load(open(fn))
    flat_speech = chain.from_iterable(data.values())
    # the count vectorizer of scikit learn    
    count_vect = CountVectorizer().fit(chain.from_iterable(data.values()))
    print 'Learn BoW vocabulary'
    tf_transformer = TfidfTransformer(use_idf=True).fit(count_vect.transform(chain.from_iterable(data.values())))
    print 'Found %d words'%len(count_vect.vocabulary_)
    for party in data.keys():
        print 'Processing %s (%d speeches)'%(party,len(data[party]))
        data[party] = tf_transformer.transform(count_vect.transform(data[party]))
    fn = folder+'/BoW.pickle'
    print 'Saving BoW to %s'%fn
    # dump data to pickle
    cPickle.dump(data,open(fn,'wb'),-1)
    # dump vectorizer to pickle
    fn = folder+'/BoW_transformer.pickle'
    print 'Saving vectorizers to %s'%fn
    vectorizers = {'count_vectorizer':count_vect,'tfidf_transformer':tf_transformer}
    cPickle.dump(vectorizers,open(fn,'wb'),-1)

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
    print args.keys() 
    if not os.path.isdir(args['folder']):
        os.mkdir(args['folder']) 
    if args['download']:
        get_files(folder=args['folder'],suffix=args['suffix'],url=args['url'])
    if args['parse']:
        partyparse(folder=args['folder'],suffix=args['suffix']) 
    if args['transform']:
        txt2BoW(folder=args['folder'])

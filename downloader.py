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
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d,array,zeros
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
        news[source] = dict([(url,clf.predict_url(url)) for url in urls])

    # save results
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    open(folder+'/news-%s'%(datestr) + '.json', 'wb').write(json.dumps(news))


def cluster_news(folder='model', topics=100, topwords=100,modeltype='kpcakmeans'):
    '''
    For better visualization, articles' BoW vectors are also clustered into topics

    INPUT
    folder      the model folder containing classifier and BoW transformer
                if folder ends with .json it is assumed to be the news.json file
    topics      number of topics for topic modelling (default 20)
    topwords    number of words for representing a cluster center (default 100)
    modeltype   type of algorithm for topic modeling, see Topicmodel class
    '''
    import glob,topicmodel
    # take most recent news file in model folder
    news = json.load(open(glob.glob(folder+'/news*.json')[-1]))
    # a topic model 
    tm = topicmodel.Topicmodel(folder=folder,modeltype=modeltype,\
            topics=topics,topwords=topwords)
    
    # collect text data from all articles
    data = []
    for source in news.keys():
        data.extend([article['text'] for article in news[source].values()])

    # train topic model on all data
    print 'Training %s topic model on %d data points'%(modeltype,len(data))
    tm.fit(data)
   
    articles = dict()
    # Now that the clusters are fit, we assign articles to topics
    for source in news.keys():
        for article in news[source].keys():
            # extract the topic assignment
            ass = tm.predict(news[source][article]['text']) 
            # store topic information associated with article
            articles[article] = {'prediction':news[source][article]['prediction'],\
                'topic':ass.flatten().tolist()[0]}

    # save article with party prediction and cluster assignments
    datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    open(folder+'/articles-%s'%(datestr)+'.json', 'wb').write(json.dumps(articles))

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

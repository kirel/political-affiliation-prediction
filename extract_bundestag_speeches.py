# -*- coding: utf-8 -*-
import re
import urllib2
import cPickle
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import glob
from scipy import ones,hstack,arange,reshape,zeros,setdiff1d
from scipy.sparse import vstack
from numpy.random import permutation
import codecs

def get_files(url='http://www.bundestag.de/plenarprotokolle', \
                folder='/Users/felix/Dropbox/partypredictor/', \
                suffix='-data.txt'):
    '''
    
    Downloads files with transcribed speeches in german parliament
    
    INPUT 
    url     the base URL of the speeches
    folder  the folder to download the files to
    suffix  a suffix for the speeche files 
    '''
    # read the site content and parse the html tree
    site = urllib2.urlopen(url)
    html = site.read()
    soup = BeautifulSoup(html)
    # get the links
    list_urls = soup.find_all('a')
    # look for the suffix links and download the files
    for url in list_urls:
        if url.has_attr('href') and url['href'].find(suffix) > 0:
            fh = open(folder+url['href'].split('/')[-1],'wb')
            fh.write(urllib2.urlopen('http://www.bundestag.de'+url['href']).read())
            fh.close()
        
def partyparse(folder='/Users/felix/Code/Python/political-affiliation-prediction/model',\
            suffix='-data.txt'):
    '''
    
    Loops through files and collects text data for each party
    Stores text of all speeches in {partyname:list_of_speech_strs} dict

    INPUT
    folder  the folder of the textfiles

    '''
    import os
    
    # a file handle to store the speech preamble, serving as label 
    # check for existing file and remove if found
    if os.path.isfile(folder+'/speech_labels.txt'):
        os.remove(folder+'/speech_labels.txt')
    
    speechlabelsfh = codecs.open(folder+'/speech_labels.txt','wb',encoding='latin_1')
    speechlabelsfh.write('String|Party\n')
    
    # find all files with suffix
    files = glob.glob(folder+'/*'+suffix)

    # substrings of parties to look for (there were issues with umlauts of gruenen)
    parties = ['90/DIE','CDU/CSU','SPD', 'DIE LINKE']
    data = {x.decode('utf-8').lower():[] for x in parties}
    
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
            for pa in data.keys():
                # if we find a party-substring in this preamble
                # take the speech to be of that party and store the label
                if pa in party[txtidx].lower():
                    foundparty = pa
                    data[pa].append(text[txtidx+1])
            # write out which party was found for this speech
            speechlabelsfh.write('%s:%s\n'%(party[txtidx],foundparty))   
    # store the preamble-party associations
    speechlabelsfh.close()
    # store the data
    cPickle.dump(data,open(folder+'/rawtext.pickle','wb'),-1)

def txt2BoW(folder='/Users/felix/Code/Python/political-affiliation-prediction/model'):
    '''

    Transforms strings of each speach into Bag-of-Words vectors, with tf-idf normalization
    VEEEEERY SLOW

    INPUT
    folder  the folder of the raw text pickle file from partyparse function

    '''
    from itertools import chain
    data = cPickle.load(open(folder+'/rawtext.pickle'))
    flat_speech = chain.from_iterable(data.values())
    
    # lookfor stopwords file
    try:
        stopwords = open(folder+'/stopwords.txt').read().split('\n')
    except:
        stopwords = ''
    # the count vectorizer of scikit learn    
    count_vect = CountVectorizer(stop_words=stopwords).fit(chain.from_iterable(data.values()))
    # the tf-idf normalizer
    tf_transformer = TfidfTransformer(use_idf=True).fit(count_vect.transform(chain.from_iterable(data.values())))
    for party in data.keys():
        data[party] = tf_transformer.transform(count_vect.transform(data[party]))
    # dump data to pickle
    cPickle.dump(data,open(folder+'/BoW.pickle','wb'),-1)
    # dump vectorizers to pickle
    cPickle.dump({'count_vectorizer':count_vect,'tfid_transformer':tf_transformer},open(folder+'/BoW_transformer.pickle','wb'),-1)


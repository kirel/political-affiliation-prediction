# -*- coding: utf-8 -*-
import re
import os
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
    parties = ['90/DIE','CDU/CSU','SPD', 'DIE LINKE']):
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

    data = {x.decode('utf-8').lower():[] for x in parties}
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
            for pa in data.keys():
                # if we find a party-substring in this preamble
                # take the speech to be of that party and store the label
                if pa in party[txtidx].lower():
                    foundparty = pa
                    data[pa].append(text[txtidx+1].lower())
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
    
    if not os.path.isdir(args['folder']):
        os.mkdir(args['folder']) 
    if args['download']:
        get_files(**args)
    if args['parse']:
        partyparse(folder=args['folder'],suffix=args['suffix']) 
    if args['transform']:
        txt2BoW(folder=args['folder'])

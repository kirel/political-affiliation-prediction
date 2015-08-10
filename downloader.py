# -*- coding: utf-8 -*-
import json
import re
import datetime
import os
from io import open
import urllib2
import cPickle
from bs4 import BeautifulSoup, UnicodeDammit
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import glob
from scipy import unique,ones,hstack,arange,reshape,zeros,setdiff1d,array,zeros,eye,argmax,percentile
from scipy.sparse import vstack
from numpy.random import permutation
import codecs

def download(url='https://www.bundestag.de/plenarprotokolle', \
                folder='model', \
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
    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    req = urllib2.Request(url,headers={'User-Agent':user_agent,})
    site = urllib2.urlopen(req)
    html = site.read()
    soup = BeautifulSoup(html)
    # get the links
    list_urls = soup.find_all('a')
    new_urls = []
    # look for the suffix links and download the files
    for url in list_urls:
        if url.has_attr('href') and url['href'].find(suffix) > 0:
            remotefn = 'http://www.bundestag.de'+url['href']
            localfn = folder + '/textdata/' + url['href'].split('/')[-1]
            if not os.path.isfile(localfn):
                print 'Found new file, downloading: %s'%remotefn
                print 'Downloading to %s'%localfn
                fh = open(localfn,'w', encoding='utf-8')
                req = urllib2.Request(remotefn,headers={'User-Agent':user_agent,})

                txt = urllib2.urlopen(req).read()
                dammit = UnicodeDammit(txt)
                txt = dammit.unicode_markup
                fh.write(txt)

                fh.close()

def get_stops():
    # generic stopwords
    stopwords = codecs.open("stopwords.txt", "r", "utf-8").readlines()[10:]
    stops = map(lambda x:x.lower().strip(),stopwords)
    # names of abgeordnete
    abgeordnete = codecs.open('abgeordnete.txt',encoding='utf-8').readlines()
    names = unique([y.strip().lower() for x in abgeordnete for y in x.split(',')]).tolist()
    return stops + names

rx_nonword = re.compile(u'[\W_^0-9]+', re.UNICODE)
rx_beifall = re.compile(r'\(beifall[^\(]{1,100}\)')
rx_zurufe = re.compile(r'\(zuruf[^\(]{1,100}\)')
pre_remove = [rx_beifall, rx_zurufe]

def clean(txt, folder='model', stopwords=[]):
    # remove applaus (too easy indicator of party affiliation)
    for rx in pre_remove:
        txt = rx.sub(' ', txt)
    tokens = [rx_nonword.sub('', split).strip() for split in txt.split(' ')]
    tokens_sans_stops = [token for token in tokens if token not in stopwords]
    txt = ' '.join(tokens_sans_stops)
    return txt

def get_speech_text(folder='model',suffix='_parsed.json'):

    # find all files with suffix
    files = glob.glob(folder+"/textdata/*"+suffix)

    for f in files:    
        # get the parsed data
        thisdata = json.loads(codecs.open(f,'r','utf-8').read())
        print "Read parsed file %s"%f
        if files.index(f) == 0:
            data = {x:[] for x in thisdata.keys()}

        print "Attaching data to speech collection"
        for pa in data.keys():
            data[pa] += thisdata[pa]

    for pa in data.keys():
        print 'Found %d speeches for party %s'%(len(data[pa]),pa)

    return data

def parse(folder='model', suffix='-data.txt', \
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

    # find all files with suffix
    files = glob.glob(folder+"/textdata/*"+suffix)

    stops = get_stops()

    print 'Processing %d files'%len(files) 
    # go through files
    for f in files:
        fn_parsed = f[:-4] + "_parsed.json"
        
        if not os.path.isfile(fn_parsed):
            print "Parsing %s (%d/%d)"%(f,files.index(f)+1,len(files))
            fh = codecs.open(f,'r', encoding='utf-8', errors='ignore')
            txt = fh.read()
            fh.close() 
            # first get rid of the 'anlagen'
            endOfTranscript = txt.find('die sitzung ist geschlossen')
            txt = txt[:endOfTranscript]
            # each speech is preceded by a pattern like "speaker (partyname):"
            # we simply look for '():'
            party = re.findall("\([^\(^\)]*\):",txt)
            text = re.split("\([^\(^\)]*\):",txt)
            
            thisdata = {x['name']:[] for x in parties}
            for txtidx in range(len(party)):
                # look for party in this text-preamble
                for pa in parties:
                    # if we find a party-substring in this preamble
                    # take the speech to be of that party and store the label
                    if pa['searchpattern'].decode('utf-8').lower() in party[txtidx].lower():
                        thisdata[pa['name']].append(clean(text[txtidx+1].lower(),folder=folder,stopwords=stops))
            
            print "Storing parsed data in %s"%fn_parsed
            open(fn_parsed,'wb').write(json.dumps(thisdata, ensure_ascii=False).encode('utf8'))

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

    parser.add_argument('-p','--parse',help='If new files should be downloaded and parsed into different parties',\
            action='store_true', default=False)
    parser.add_argument('-d','--download',help='If texts should be parsed/cleaned',\
            action='store_true', default=False)
    
    args = vars(parser.parse_args())
    if not os.path.isdir(args['folder']):
        os.mkdir(args['folder']) 
     
    if args['download']:
        download(folder=args['folder'])

    if args['parse']:
        parse(folder=args['folder'],suffix=args['suffix'])        


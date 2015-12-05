import glob
import re
from itertools import chain
from sklearn.feature_extraction.text import CountVectorizer,HashingVectorizer,TfidfTransformer
from sklearn.preprocessing import LabelEncoder
from scipy import array, unique

R = r'104|201|203|305|401|402|407|414|505|601|603|605|606'
L = r'103|105|106|107|403|404|406|412|413|504|506|701|202'

def right_left_features(s):
    return len(re.findall(R,s)) - len(re.findall(L,s))

def load_manifesto(folder="manifestoproject"):
    '''
    loads manifesto text data as bow features and binary labels
    '''
    
    vec = CountVectorizer(min_df=2)
    tfidf = TfidfTransformer(use_idf=True)
    files = glob.glob(folder+"/[0-9]*_[0-9]*.csv")
    lines = chain(*map(lambda x: open(x).readlines()[1:],files))
    data = filter(None,map(lambda x: parse_manifesto(x),lines))
    vec = CountVectorizer(min_df=2).fit(map(lambda x: x[0],data))
    counts = vec.transform(map(lambda x: x[0],data))
    tfidf = TfidfTransformer(use_idf=True).fit(counts)
    bow = tfidf.transform(counts)
    labels = array(map(lambda x: right_left_features(x[1]),data))
    valid = labels != 0
    return bow[valid],vec.vocabulary_,labels[valid]

def get_text(folder="manifestoproject"):
    files = glob.glob(folder+"/[0-9]*_[0-9]*.csv")
    lines = chain(*map(lambda x: open(x).readlines()[1:],files))
    data = filter(None,map(lambda x: parse_manifesto(x),lines))
    labels = unique(map(lambda x: x[1],data))
    data = dict([(l,zip(*filter(lambda x: x[1]==l,data))[0]) for l in labels])
    return data

def get_raw_text(folder='manifestoproject'):
    files = glob.glob(folder+"/[0-9]*_[0-9]*.csv")
    lines = chain(*map(lambda x: open(x).readlines()[1:],files))
    return zip(*filter(None,map(lambda x: parse_manifesto(x),lines)))
    

def parse_manifesto(line):
    d = re.findall("\"[^\"]*\",\"\d+\"",line)
    if d:
        text,label = d[0][1:-1].split("\",\"")
        return text,int(label)



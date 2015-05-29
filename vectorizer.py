import os
import cPickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from itertools import chain,islice
from Stemmer import Stemmer

class Vectorizer:
    '''

    Bag-of-Words vectorizer with stemming, bigrams or tf-idf normalization

    '''
    
    def __init__(self,folder='model',steps=['hashing','tfidf'],train=False):
        '''
        Initialize Vectorizer
        Loads or trains bow vectorizer

        '''
        self.folder = folder
        self.steps = steps
        self.fn = self.folder+'/vectorizer_%s.pickle'%'_'.join(sorted(steps))
        if (not os.path.isfile(self.fn)) or train:
            print "Training Vectorizer"
            self.train()
        else: 
            print "Loading Vectorizer"
            self.processors = cPickle.load(open(self.fn))
        

    def train(self):
        '''
        
        Trains a bow vectorizer

        '''
        
        processors = dict()
        fn = self.folder+'/textdata/rawtext.pickle'
        print 'Loading Textfile %s'%fn
        data = cPickle.load(open(fn))
        text = chain.from_iterable(data.values())
        
        # stemming
        if 'stemming' in self.steps:
            print "Stemming"
            processors['stemmer'] = Stemmer('german')
            text = map(lambda y:' '.join(processors['stemmer'].stemWords(y.split(' '))),text)

        # the count vectorizer of scikit learn
        if 'hashing' in self.steps:
            print 'Hashing Bag of words vectorizer'
            count_vect = HashingVectorizer(ngram_range=(1,5),decode_error='ignore').fit(text) 
        elif 'trigrams' in self.steps:
            print "Trigram Bag-of-Words"
            count_vect = CountVectorizer(ngram_range=(1,3),min_df=2).fit(text)
        elif 'bigrams' in self.steps:
            print "Bigram Bag-of-Words"
            count_vect = CountVectorizer(ngram_range=(1,2),min_df=2).fit(text)
        else: 
            print "Unigram Bag-of-Words"
            count_vect = CountVectorizer(min_df=2).fit(text)
        
        processors['count_vectorizer'] = count_vect
        text = count_vect.transform(chain.from_iterable(data.values()))

        if 'tfidf' in self.steps:
            print "Tf-idf normalization"
            processors['tf_transformer'] = TfidfTransformer(use_idf=True).fit(text)
            text = processors['tf_transformer'].transform(text)

        # dumping this vectorizer to pickle
        fn = self.folder+'/vectorizer_%s.pickle'%'_'.join(sorted(self.steps))
        cPickle.dump(processors,open(fn,'wb'),-1)
        
        self.processors = processors
        fn = self.folder+'/bag_of_words_%s.pickle'%'_'.join(sorted(self.steps))
        for party in data.keys():
            data[party] = self.transform(data[party])
        cPickle.dump(data,open(fn,'wb'),-1)

    def transform(self,txt):
        '''

        Transforms text into wordcounts

        '''

        if 'stemmer' in self.processors.keys():
            txt = map(lambda y:' '.join(self.processors['stemmer'].stemWords(y.split(' '))),txt)
        bow = self.processors['count_vectorizer'].transform(txt)
        if 'tf_transformer' in self.processors.keys():
            bow = self.processors['tf_transformer'].transform(bow)
        
        return bow


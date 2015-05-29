# -*- coding: utf-8 -*-
from sklearn.cluster import KMeans
import classifier
from scipy import zeros,double
import datetime
import json
import cPickle
from vectorizer import Vectorizer

class TopicEmbeddingModel():
    '''
    Wrapper class for different topic models
    
    '''
    def __init__(self,folder='model',modeltype='kpca',topics=10):
        # the classifier, which also contains the trained BoW transformer
        self.bow = Vectorizer(folder=folder,steps=['hashing','tfidf'])
        self.folder = folder
        self.modeltype = modeltype
        self.topics = topics

        if self.modeltype is 'kpca':
            from sklearn.decomposition import KernelPCA
            self.model = KernelPCA(kernel='rbf',gamma=1.,n_components=topics)
        if self.modeltype is 'nmf':
            from sklearn.decomposition import NMF
            self.model = NMF(n_components=topics)

    def fit(self,X):
        '''
        fits a topic model

        INPUT
        X   list of strings
        '''

        # transform list of strings into sparse BoW matrix
        X = self.bow.transform(X)
        #X = self.bow['tfidf_transformer'].fit_transform(\
        #    self.bow['count_vectorizer'].fit_transform(X))

        # depending on the model, train
        if self.modeltype is 'kpca':
            Xc = self.model.fit_transform(X)
        if self.modeltype is 'nmf':
            Xc = self.model.fit_transform(X)


    def predict(self,X):
        '''
        predicts cluster assignment from list of strings
        
        INPUT
        X   list of strings
        '''
        if X is not list: X = [X]
        X = self.bow.transform(X)
        #X = self.bow['tfidf_transformer'].transform(\
        #    self.bow['count_vectorizer'].transform(X))
        
        if self.modeltype is 'kpca':
            return self.model.transform(X)
        if self.modeltype is 'nmf':
            return self.model.transform(X)

        

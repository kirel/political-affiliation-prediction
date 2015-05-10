# -*- coding: utf-8 -*-
from sklearn.cluster import KMeans
import classifier
from scipy import zeros,double
import datetime
import json

class Topicmodel():
    '''
    Wrapper class for different topic models
    
    '''
    def __init__(self,folder='model',modeltype='kmeans',topics=10,topwords=100):
        # the classifier, which also contains the trained BoW transformer
        clf = classifier.Classifier(folder=folder)    
        self.bow = clf.bow
        self.folder = folder
        # transform word to BoW index into reverse lookup table
        words = clf.BoW['count_vectorizer'].vocabulary_.values()
        wordidx = clf.BoW['count_vectorizer'].vocabulary_.keys()
        self.idx2word = dict(zip(words,wordidx))         
        self.modeltype = modeltype
        self.topics = topics
        self.topwords = topwords
        if self.modeltype is 'kmeans':
            from sklearn.cluster import KMeans
            self.model = KMeans(n_clusters=topics)
        if self.modeltype is 'kpcakmeans':
            from sklearn.cluster import KMeans
            from sklearn.decomposition import KernelPCA
            self.model = {'kpca':KernelPCA(kernel='rbf',gamma=1.),\
                'kmeans':KMeans(n_clusters=topics)}
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
        X = self.bow(X)
        # depending on the model, train
        if self.modeltype is 'kmeans':
            Xc = self.model.fit_predict(X)
        if self.modeltype is 'kpcakmeans':
            self.model['kpca'].fit(X)
            Xc = self.model['kmeans'].fit_predict(self.model['kpca'].transform(X))
        if self.modeltype is 'nmf':
            Xc = self.model.fit_transform(X).argmax(axis=0)
        # for each cluster/topic compute covariance of word with cluster label
        # this measure is indicative of the importance of the word for the topic
        ass = zeros(self.topics)
        self.topicstats = []
        for cluster in range(self.topics): 
            # this is a binary vector, true if a data point was in this cluster
            y = double(Xc==cluster)
            # this is the covariance of the data with the cluster label
            Xcov = X.T.dot(y)
            # find the most strongly covarying (with the cluster label) words
            wordidx = reversed(Xcov.argsort()[-self.topwords:])
            topicwords = dict([(self.idx2word[idx],Xcov[idx]) for idx in wordidx])
            self.topicstats.append({'assignments':y.sum(),'clusterid':cluster,\
                'words': topicwords})

            print 'Topic %d: %3d Assignments '%(cluster,y.sum())\
                + 'Topwords: ' + ' '.join(topicwords.keys()[:10])
        
        datestr = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        fn = self.folder+'/topicmodel-%s-'%self.modeltype +datestr+'.json'
        print "Saving model stats to "+fn
        open(fn,'wb').write(json.dumps(self.topicstats))

    def predict(self,X):
        '''
        predicts cluster assignment from list of strings
        
        INPUT
        X   list of strings
        '''
        X = self.bow(X)
        if self.modeltype is 'kmeans':
            return self.model.predict(X)
        if self.modeltype is 'kpcakmeans':
            return self.model['kmeans'].predict(self.model['kpca'].transform(X))
        if self.modeltype is 'nmf':
            return self.model.transform(X).argmax(axis=0)

        

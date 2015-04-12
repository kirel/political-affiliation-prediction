# -*- coding: utf-8 -*-
import cPickle

parties = [     'B\xdcNDNIS\xa090/DIE GR\xdcNEN',
                'CDU/CSU', 
                'SPD',
                'DIE LINKE'
            ]

def predict(text,folder='model'):
    '''
    Loads scikit-learn Bag-of-Word extractor and classifier and
    applies it to some text. 
    '''
    # load classifier
    clf = cPickle.load(open(folder+'/classifier.pickle'))
    # load Bag-of-Word extractor
    BoW = cPickle.load(open(folder+'/BoW_transformer.pickle'))
    # transform string into sparse matrix
    x = BoW['tfid_transformer'].transform(
            BoW['count_vectorizer'].transform([text]))
    # predict probabilities of each party
    probabilities = clf.predict_proba(x)
    # transform the predictions into json output
    result = {'text':text,'prediction':[]}
    for pidx in range(len(parties)): 
        result['prediction'].append(
            {   'party':unicode(parties[pidx],errors='ignore'),
                'probability':probabilities.flatten()[pidx]
            })
    return result


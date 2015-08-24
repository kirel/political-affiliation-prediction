# -*- coding: utf-8 -*-
import re
import cPickle
from classifier import Classifier
import json
from scipy import ones,argmax
from sklearn.metrics import classification_report,confusion_matrix
import codecs

def get_partyprograms(folder='model', clf=None):
    # converted with pdftotext
    text = {}
    bow = {}
    # from https://www.spd.de/linkableblob/96686/data/20130415_regierungsprogramm_2013_2017.pdf
    txt = codecs.open(folder+'/textdata/SPD_programm.txt', 'r', 'utf-8').read()
    # remove page footer 
    txt = re.sub(u'Das Regierungsprogramm 2013 – 2017\W+\d+\W+','\n',txt)
    # split in sections
    txt = re.split('\n(IX|IV|V?I{0,3}\.\d? )',txt)
    text['spd'] = [part for part in txt if len(part) > 100]

    # from http://www.cdu.de/sites/default/files/media/dokumente/regierungsprogramm-2013-2017-langfassung-20130911.pdf
    txt = codecs.open(folder+'/textdata/CDU_programm.txt', 'r', 'utf-8').read()
    # remove page footer 
    txt = re.sub(u'\W+Gemeinsam erfolgreich für Deutschland | Regierungsprogramm 2013 – 2017\W+','\n',txt)
    # remove page numbers
    txt = re.sub(u'\n\d+\n',' ',txt)
    # get sections
    txt = re.split(u'\n\d\.\d?\W',txt)
    # remove sections without proper text
    txt = [t for t in txt if len(t)>1000]
    text['cdu'] = txt

    # from https://www.die-linke.de/fileadmin/download/wahlen2013/bundestagswahlprogramm/bundestagswahlprogramm2013_langfassung.pdf
    txt = codecs.open(folder+'/textdata/LINKE_programm.txt', 'r', 'utf-8').read()
    # remove page numbers
    txt = re.sub(u'\n\d+\n',' ',txt)
    # get sections
    txt = re.split('\n\n+',txt)
    # remove sections without proper text
    txt = [t for t in txt if len(t)>1000]
    text['linke'] = txt
    

    # from http://www.gruene.de/fileadmin/user_upload/Dokumente/Wahlprogramm/Wahlprogramm-barrierefrei.pdf
    txt = codecs.open(folder+'/textdata/GRUENE_programm.txt', 'r', 'utf-8', ).read()
    # remove page footer 
    txt = re.sub(u'(\d+)?\W+Bundestagswahlprogramm 2013\nBündnis 90/Die Grünen\W+\d?\n','\n',txt)
    txt = re.sub(u'Teilhaben. Einmischen. Zukunft schaffen.','',txt)
    txt = re.sub(u'Zeit für den grünen Wandel','',txt)
    #   remove page numbers
    txt = re.sub(u'\n\d+\n',' ',txt)
    # get sections
    txt = re.split(u'\n\d\.\d?\W',txt)
    # remove sections without proper text
    txt = [t for t in txt if len(t)>1000]
    text['gruene'] = txt
    return text 
    
def partyprograms(folder='model'):
    text = get_partyprograms(folder=folder)
    clf = Classifier(folder=folder)
    predictions,predictions_total = dict(),dict()
    Ytrue, Yhat = [],[]
    for key in text.keys():
        predictions[key] = []
        # for each paragraph separately
        for paragraph in text[key]:
            prediction = clf.predict(paragraph)['prediction']
            idx = argmax([x['probability'] for x in prediction])
            Yhat.append(text.keys().index(prediction[idx]['party']))
            predictions[key].append(prediction)
        #predictions[key] = map(lambda x: clf.predict(x)['prediction'],text[key])
        # for the entire program at once
        predictions_total[key] = clf.predict(' '.join(text[key]))['prediction']
        Ytrue.extend(ones(len(text[key]))*text.keys().index(key))
        
    print(confusion_matrix(Ytrue,Yhat))
    print(classification_report(Ytrue,Yhat,target_names=text.keys()))

    json.dump(predictions,open(folder+'/textdata/predictions.json','wb'),ensure_ascii=False)
    json.dump(predictions_total,open(folder+'/textdata/predictions_total.json','wb'),ensure_ascii=False)

    

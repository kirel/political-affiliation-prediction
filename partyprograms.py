# -*- coding: utf-8 -*-
import re
import cPickle
from classifier import Classifier
import json
from scipy import ones,argmax
from sklearn.metrics import classification_report,confusion_matrix

def partyprograms(folder='model'):
    clf = Classifier(folder=folder)
    # converted with pdftotext
    text = {}
    bow = {}
    # from https://www.spd.de/linkableblob/96686/data/20130415_regierungsprogramm_2013_2017.pdf
    txt = open(folder+'/textdata/SPD_programm.txt').read()
    # remove page footer 
    txt = re.sub(r'\W+Das Regierungsprogramm 2013 – 2017\W+\d+\W+','\n',txt)
    # split in sections
    txt = re.split('\n(IX|IV|V?I{0,3}\.\d? )',txt)
    text['spd'] = txt

    # from http://www.cdu.de/sites/default/files/media/dokumente/regierungsprogramm-2013-2017-langfassung-20130911.pdf
    txt = open(folder+'/textdata/CDU_programm.txt').read()
    # remove page footer 
    txt = re.sub(r'\W+Gemeinsam erfolgreich für Deutschland | Regierungsprogramm 2013 – 2017\W+','\n',txt)
    # remove page numbers
    txt = re.sub(r'\n\d+\n',' ',txt)
    # get sections
    txt = re.split(r'\n\d\.\d?\W',txt)
    # remove sections without proper text
    txt = [t for t in txt if len(t)>1000]
    text['cdu'] = txt

    # from https://www.die-linke.de/fileadmin/download/wahlen2013/bundestagswahlprogramm/bundestagswahlprogramm2013_langfassung.pdf
    txt = open(folder+'/textdata/LINKE_programm.txt').read()
    # remove page numbers
    txt = re.sub(r'\n\d+\n',' ',txt)
    # get sections
    txt = re.split('\n\n+',txt)
    # remove sections without proper text
    txt = [t for t in txt if len(t)>1000]
    text['linke'] = txt


    # from http://www.gruene.de/fileadmin/user_upload/Dokumente/Wahlprogramm/Wahlprogramm-barrierefrei.pdf
    txt = open(folder+'/textdata/GRUENE_programm.txt').read()
    # remove page footer 
    txt = re.sub(r'(\d+)?\W+Bundestagswahlprogramm 2013\nBündnis 90/Die Grünen\W+\d?\n','\n',txt)
    txt = re.sub(r'Teilhaben. Einmischen. Zukunft schaffen.','',txt)
    txt = re.sub(r'Zeit für den grünen Wandel','',txt)
    # remove page numbers
    txt = re.sub(r'\n\d+\n',' ',txt)
    # get sections
    txt = re.split(r'\n\d\.\d?\W',txt)
    # remove sections without proper text
    txt = [t for t in txt if len(t)>1000]
    text['gruene'] = txt
    
    json.dump(text,open(folder+'/textdata/programs.json', 'wb'),ensure_ascii=False)
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

    

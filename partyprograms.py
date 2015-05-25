# -*- coding: utf-8 -*-
import re
import cPickle
from vectorizer import Vectorizer
import json
import codecs

def partyprograms(folder='model'):
    vv = Vectorizer(folder)
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
    for key in text.keys():
        bow[key] = vv.transform(text[key])
    cPickle.dump(bow,open(folder+'/textdata/bag_of_words_programs.pickle','wb'),-1)

    

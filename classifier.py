# -*- coding: utf-8 -*-

# TODO unpickle real classifier and glue stuff into predict

def predict(text):
    return dict(
            text=text,
            prediction=[
                dict(party='Grüne', probability=0.1),
                dict(party='SPD', probability=0.2),
                dict(party='CDU', probability=0.3),
                dict(party='Piraten', probability=0.4)
                ]
            )

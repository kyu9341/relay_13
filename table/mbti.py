category = {
    1 : 'ISTJ',
    2 : 'ISFJ',
    3 : 'INFJ',
    4 : 'INTJ',
    5 : 'ISTP',
    6 : 'ISFP',
    7 : 'INFP',
    8 : 'INTP',
    9 : 'ESTP',
    10 : 'ESFP',
    11 : 'ENFP',
    12 : 'ENTP',
    13 : 'ESTJ',
    14 : 'ESFJ',
    15 : 'ENFJ',
    16 : 'ENTJ'
}

import sys
test = sys.argv[1];

import joblib
from collections import Counter
import numpy as np
file_name = './table/mbti_module.pkl'
logr = joblib.load(file_name)
import pickle
with open('./table/tfidfTokenizer', 'rb') as f:
    vect = pickle.load(f)

from konlpy.tag import Komoran
komoran = Komoran()

t1 = komoran.nouns(test)
if(len(t1) == 0) :
    print(" ")
else:
    x = vect.transform(t1)
    result = logr.predict(x)


    s1 = list(set(result))

    from collections import Counter

    result = result.tolist()

    cnt = Counter(result)
    cnt.most_common()
    if (len(result) == result.count(7)):
        print(category[7])
    else:
        mmn = [result.count(x) for x in range(16)]
        print(category[mmn.index(max(mmn)) + 1])
---
title: Simple article summarization
author: Jernej Virag
layout: post
comments: true
permalink: /2013/10/simple-article-summarization/
categories:
  - Helpful tips
  - My work
  - Text mining
  - Python
tags:
  - python
  - nltk
  - lemmagen
  - lemmatizer
  - text mining
  
---
I've been spending my time hacking on my slovenian [news parser][1] called news-bus buddy (source on [Bitbucket][2]. Since the "recent news" page looked a little empty with only news titles, I needed an algorithm to get summary of an article from database. 

## The idea

The algorithm is simple and very naive, it works as follows:

 - Count number of occurences of each word in article
 - Take top 50 words by number ("most common words") 
 - For each sentence, find how many of "most common words" appear in that sentence
 - Choose three best sentences by number of most common words

For the algorithm to work properly, words must be lemmatized and stopwords filtered.

The algorithm is heavily based on [article about summarization by Hu, Sun, Lim][6] and Python implementation of theory [by thavelick on GitHub][7].
 
## The implementation


[The implementation][3] uses [Natural Language Toolkit][4] Python library for basic text processing. NLTK is probably one of the best natural language processing libraries out there right now.

It also uses LemmaGen lemmatizer for stemming of words, which is available [on BitBucket][5] with Python bindings.

<!--more-->
 
``` python summarizer.py

from collections import defaultdict
import operator
from lemmatizer.sllematizer import RdrLemmatizer
import nltk.data
from nltk import FreqDist
from nltk.tokenize import word_tokenize
import os

lemmatizer = RdrLemmatizer("lem-me-sl.bin")
sent_detector = nltk.data.load("tokenizers/slovene.pickle")

stopwords = open("stopwords.txt"), "rb").read().splitlines()
stopwords = filter(lambda w: not w.startswith("#"), stopwords)
# Convert to unicode
stopwords = [word.decode("utf-8") for word in stopwords]

# Get words from article
words = word_tokenize(article_text)

# Filter non-alphanumeric chars from words
words = [filter(unicode.isalnum, word) for word in words]
words = filter(lambda w: len(w) > 0, words)  # Remove empty words

# Now lemmatize all words
words = [lemmatizer.lemmatize(word).lower() for word in words if word.lower() not in stopwords]
word_frequencies = FreqDist(words)
most_frequent = [word[0] for word in word_frequencies.items()[:50]]

# Now get sentences
sentences = sent_detector.tokenize(article_text)

wordcountdict = defaultdict(int)

for word in most_frequent:
	lem_word = lemmatizer.lemmatize(word).lower()
	for i in range(0, len(sentences)):
		if lem_word in sentences[i]:
			wordcountdict[i] += 1

sorted_wordcounts = sorted(wordcountdict.iteritems(), key=operator.itemgetter(1), reverse=True)[:num_sentences]
    
summary = [sentences[num] for num, count in sorted_wordcounts]
print "Summary: %s" % (summary,) 
```

## Improvements

Of course, the algorithm is very naive and it doesn't give best results at all times: it heavily prefers longer sentences over shorter ones because it counts words with absolute numbers. Filtering stopwords significantly improves results, but further improvements would by possible by:

- Weighting words with TF/IDF when choosing the "most common words" array
- Normalizing count of "most common words" in a sentence with sentence length. (_It is however true, that people prefer longer sentences for summaries, so this might not produce best results._)

I'd be happy to hear more ideas about how to improve the algorithm.


 [1]: http://news.virag.si/
 [2]: https://bitbucket.org/mavrik/news-buddy
 [3]: https://bitbucket.org/mavrik/news-buddy/src/e6e999c77bd4dedcb779a91c4bb0832bdd39a999/mining/summarizer.py?at=master
 [4]: http://nltk.org/
 [5]: https://bitbucket.org/mavrik/slovene_lemmatizer
 [6]: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.222.6530&rep=rep1&type=pdf
 [7]: https://github.com/thavelick/summarize
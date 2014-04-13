---
layout: post
title: "Solr slovenian lemmatizer updated with easier installation"
author: Jernej Virag
date: 2013-12-15 21:17:26 +0100
comments: true
permalink: /2013/12/solr-slovenian-lemmatizer-updated/
categories:
  - Helpful tips
  - My work
  - Solr
  - Text mining
tags:
  - java
  - lemmagen
  - lemmatizer
  - solr
  - text mining
---
I've just uploaded 1.1 update for Lemmagen lemmatizer for Solr, which is now a pure Java .JAR library and does not require installation of any additional files on your server. 
New version also updates package name and configuration attribute to be more consistent.

## Installation

#### 1. Download library

Download the library JAR from BitBucket: [Lemmatizer][1]

#### 2. Add library to Solr's Java path

Copy library JAR to your application's server `lib` dir or copy it to your core's `lib` dir.  E.g. if your core is located in /var/solr/core, create a lib folder next to conf and data folders of the core and copy the `lemmatizer_solr_1.1.jar` there.

#### 3. Add lemmatizer to schema.xml

Add lemmatizer filter to your Solr schema and pass desired language to it:

``` xml
   <filter class="si.virag.solr.LemmagenLemmatizerFactory" language="slovenian" />
```

That's it. Suppored languages are: english, french, estonian, bulgarian, czech, slovakian, slovenian, serbian, russian, romanian, hungarian, macedonian and polish.

This version is based on [Michal Hlaváč][3]'s excellent [jLemmaGen][2] Java port of Lemmagen library. It was tested with Solr 4.3 and newer.

  [1]: https://bitbucket.org/mavrik/slovene_lemmatizer/downloads/lemmatizer_solr_1.1.jar 
  [2]: https://bitbucket.org/hlavki/jlemmagen
  [3]: http://blog.hlavki.eu/
---
title: Slovene lemmatization in Solr
author: Jernej Virag
layout: post
comments: true

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
[Apache Solr][1] is a popular full-text search engine with RESTful interface, which makes it perfect search engine with most type of web sites. However, the quality of search results is dependent on language filters, with a good lemmatizer being the most essential.

That's why I've created a Solr module, which uses JSIs [LemmaGen][2] lemmatizer for Solr index building and search queries. The source to the lemmatizer and module is available on Bitbucket [slovene_lemmatizer repository][3].

<!--more-->

## Installing files

### 1. Download lemmatizer files

Compile the files yourself of grab pre-compiled binaries from downloads section of the repository:

[Solr 4.x / Linux x64][4]

### 2. Install lemmatizer native library

Move `libLemmatizer.so` to a path in your application servers `java.library.path`. You can either copy it to a default search directory (e.g. `/usr/local/lib`) or pass `-Djava.library.path=/path/to/libLemmatizer.so` to your application server startup script.

For Tomcat 6 on Debian/Ubuntu edit /etc/default/tomcat6 and upadte JAVA_OPTS to:

``` bash
JAVA_OPTS="-Djava.awt.headless=true -Xmx128m -XX:+UseConcMarkSweepGC -Djava.library.path=/path/to/folder/with/liblemmatizer/so"
```

### 3. Install lemmatizer Solr module

Copy `sl_lemmatizer-1.0.jar` to your cores lib directory. E.g. if your core is located in `/var/solr/core`, create a `lib` folder next to `conf` and `data` folders of the core and copy the lemmatizer there.

### 4. Copy lemmatizer dictionary to folder accessible by Tomcat

Copy .bin file for your selected language from dictionaries folder to a folder readable by Tomcat. I usually put it into Solrs Catalina home directory. Dictionary file for slovenian language is named `lem-me-sl.bin`.

## Configuring Solr

Lemmatizer is a Solr filter, so you use it by passing a `<filter>` parameter into index and query `<analyzer>` parts in `schema.xml`. The lemmatizer requires path to dictionary file as a parameter:

``` xml
<filter class="si.virag.solr.RdrLemmatizerFactory" dictionary="/path/to/lem-me-sl.bin" />
```

## Full example

The full Solr configuration example with schema.xml is available on my GitHub in [solr_example][5] repository. More information can also be found on the [slides for my Solr talk][6] in Kiberpipa.

Contributions to the library or examples welcome :)

 [1]: http://lucene.apache.org/solr/
 [2]: http://lemmatise.ijs.si/
 [3]: https://bitbucket.org/mavrik/slovene_lemmatizer/
 [4]: https://bitbucket.org/mavrik/slovene_lemmatizer/downloads/lemmatizer_linux_amd64.tar.gz
 [5]: https://github.com/izacus/solr_example
 [6]: http://www.slideshare.net/izacus/solr-16252191
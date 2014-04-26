---
layout: post
title: "Apache Solr Webcamp talk slides and links"
permalink: /2014/04/webcamp-ljubljana-solr-talk/
date: 2014-04-26 14:08:05 +0200
comments: true
categories: 
 - Solr
 - Text mining
 - Lectures
 - My Work
---

This week, on april 26th, I gave a talk about Solr basics on [WebCamp Ljubljana][10]. Here I'm listing the slides, tips and the relevant links for anyone starting up with Solr.

<br />

<script async class="speakerdeck-embed" data-id="f33543f0af680131b21e2611049e19f7" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<br />

Here I'm listing relevant links from the slide-deck which are good starting point for Solr deployment.

### Reference guide

[Apache Solr Reference Guide / Wiki][3] - Use this for main reference, for some reson all Google links go to obsolete Solr Wiki.

Points of interest in the reference guide:

[Language analysis][4] - Guides for Solr configuration for different languages

[Filter reference guide][5] - List of all Lucene filters available in Solr with descriptions 

[Character filter reference guide][6] - List of all Lucene filters working on character level (e.g. ščž -> scz collapse, punctuation removal, etc.)


### Configuration examples

[Basic Solr Home][2] - a minimal Solr home configuration with two cores configured for slovene and english language

[NewsBuddy][1] - an opensource full-text search site for news articles. It has a nice example of how to effectively configure Solr for Slovenian articles.

[LemmaGen Slovenian lemmatizer][7] - Solr plugin for slovenian lemmatization

### Solr libraries

[Solr Client Libraries][8] - List of Solr client libraries

[PySolarized][9] - My Solr/Python communication library with multilanguage support

[1]: https://bitbucket.org/mavrik/news-buddy
[2]: https://github.com/izacus/solr_example
[3]: https://cwiki.apache.org/confluence/display/solr/Getting+Started
[4]: https://cwiki.apache.org/confluence/display/solr/Language+Analysis
[5]: https://cwiki.apache.org/confluence/display/solr/Filter+Descriptions
[6]: https://cwiki.apache.org/confluence/display/solr/CharFilterFactories
[7]: https://www.virag.si/2013/12/solr-slovenian-lemmatizer-updated/
[8]: https://cwiki.apache.org/confluence/display/solr/Client+APIs
[9]: https://www.virag.si/2014/04/project-spotlight-pysolarized/
[10]: http://webcamp.si/
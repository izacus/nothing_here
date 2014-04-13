---
title: Rent-a-cycle info in Ljubljana, project done
author: Jernej Virag
layout: post
permalink: /2011/05/rent-a-cycle-info-in-ljubljana-project-done/
categories:
  - Bicikel
  - My work
  - Android
tags:
  - android
  - bicikelj
  - mobile
  - programming
  
---

[{% img right /images/posts/2011_06_06_qr.png 148 148 Bicikel app %}][1]

[Bicike(LJ)][2] is a rent-a-cycle project in Ljubljana, where you can rent bikes from pre-built stations and use them for fast and rather efficient transport across the city. It's cheap (renting a bike for up to one hour is free) and the bikes are comfortable enough.

However, now there are problems in the evenings with stations in the city center being empty and the outlying stations being full. There's nothing more annoying than cycling across the city in the middle of the night and finding that your station is full and you can't park your bike there. Since this annoyed me, I used up some of the free time to make a quick Android application to see which stations have bikes available and which are full. In the process I managed to find new quirks in Android API and learned how to draw (ugly) icons in GIMP.

So, presenting Bicikel app:

{% img /images/posts/2011_05_30_ss1.jpg 180 300 List of stations %}

The application just lists all known working Bicikelj stations with number of bikes parked and number of free spaces available. For convenience, the results are sorted by distance from you (if location is available) and map with all stations is also provided.

{% img /images/posts/2011_05_30_ss2.jpg 180 300 List of stations %}

So far the application works pretty well. Thanks to [Gašper Žejn][3] for aggregating API data into his own API service.  
The things missing I intend to implement are

*   notifications if the station you're headed to has filled
*   slightly more functional design with directions to nearest station

The application is [available on Android Market for free][1].

 [1]: http://market.android.com/details?id=si.virag.bicikelj
 [2]: http://www.bicikelj.si/
 [3]: http://www.kiberpipa.org/~hruske/blog/?p=612
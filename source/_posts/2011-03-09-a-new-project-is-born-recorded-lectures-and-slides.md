---
title: 'A new project is born: recorded lectures and slides'
author: Jernej Virag
layout: post
permalink: /2011/03/a-new-project-is-born-recorded-lectures-and-slides/
robotsmeta:
  - index,follow
categories:
  - Computer stuff
  - My work
  - sDetect
tags:
  - computer vision
  - Diploma
  - Kiberpipa
  - lectures
  - OpenCV
  - programming
  - PyFFMPEG
  - python
  - sDetect
  - slides
  - videos
  
---
Lately I've watched several recorded video lectures and I've noticed, that usually I can't see the slides on them all that well. Which can pose a problem with lecturers, who rely heavily on their slides for visibility. Later on, I've seen that [VideoLectures][1] solve this problem by showing pictures of slides next to the video itself, which is a pretty neat solution. I've been thinking about implementing this to [Kiberpipa][2] lecture videos, however the problem is, that Kiberpipa doesn't have the manpower, to watch all the videos and tag the exact slide timings in it.

The logical solution would be to detect the slides in video automatically - but of course, there's no library to do that yet. Which is why I have decided to actually make one for my final CS diploma project, with a little help of my CV course material.

It seems the best way to do the solution will be to use [pyffmpeg][3] to actually decode the video and use [OpenCV][6] for computer vision algorithms, so I won't have to reimplement them again by myself.

Also, [Richard Szelinski][4] has made [his book][5] about practical computer vision algorithms and applications available to public, which is also a great help, as it has bunch of useful applications and algorithms listed.

More postings with progress will follow.

 [1]: http://videolectures.net/
 [2]: http://video.kiberpipa.org/
 [3]: http://code.google.com/p/pyffmpeg/
 [4]: http://research.microsoft.com/en-us/um/people/szeliski/
 [5]: http://szeliski.org/Book/
 [6]: http://opencv.willowgarage.com/wiki/
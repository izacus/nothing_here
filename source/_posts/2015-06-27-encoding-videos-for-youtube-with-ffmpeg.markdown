---
layout: post
comments: true
title: "Encoding videos for YouTube with FFMpeg"
date: 2015-06-27 14:53:15 +0200
comments: true
categories: 
  - Helpful tips
  - Video encoding / FFmpeg
tags:
  - ffmpeg
  - youtube
  - streaming
  - 'tips & tricks'
  - videos
---
One of the most commonly asked questions on Freenode/#ffmpeg is how to use it to encode videos for YouTube in accordance to Googles [Recommended upload encoding settings](https://support.google.com/youtube/answer/1722171?hl=en). Conforming to the guideline is rather simple, but not straightforward for the newcomer.

## 1. Get newish ffmpeg

Get decently new and updated ffmpeg - the current stable release is 2.7.

##### OS X:

`brew install ffmpeg`

##### Windows:

Get a 64-bit static build from [Zeranoe's site](http://ffmpeg.zeranoe.com/builds/).

##### Linux:

Get a 64-bit static build from [Linux static build site](http://johnvansickle.com/ffmpeg/).


## 2. The command line

```bash
ffmpeg -i <input file> -codec:v libx264 -crf 21 -bf 2 -flags +cgop -pix_fmt yuv420p -codec:a aac -strict -2 -b:a 384k -r:a 48000 -movflags faststart <output_name>.mp4
```

This should suffice for full conformity. Explanation of parameters used:

Parameter | Meaning
----------|:--------------
**-codec:v libx264** | set video codec to H.264
**-crf 21** | set video quality. Lower number means higher quality. 21 is a reasonable default which will create videos with bitrates as per guideline.
**-bf 2** | maximum 2 B-frames as per guideline
**-flags +cgop** | closed GOP as per guideline
**-pix_fmt yuv420p** | chroma subsampling 4:2:0 as per guideline
**-codec:a aac -strict -2** | set audio codec to AAC
**-b:a 384** | set audio bitrate to 348k, set this to 512k if you have 5.1 audio
**-r:a 48000** | set audio samplerate to 48000Hz as per guideline
**-movflags faststart** | put MOOV atom at the front of the file

<br />
If any of the parameters don't work properly, check your ffmpeg version. Especially Ubuntu 12.04/14.04 and other Debian based distros package obsolete ffmpeg as part of their apt repositories.
 
---
layout: post
title: "Talk about live web video streaming on WebCamp Ljubljana"
date: 2015-03-28 09:23:45 +0100
comments: true
categories:
  - Video encoding / FFmpeg
  - Lectures
tags:
  - lectures
  - videos
---

Live video streaming is still a touchy subject and not well supported across browsers and mobile devices. Hence I did a short overview of how to start on this years [WebCamp Ljubljana][1]. The lecture has since been published as a video as well.


Relevant links from the slides:

[Pre-built FFMpeg downloads][2] - Official FFMpeg site with precompiled ffmpeg builds for major platforms

[Nginx RTMP module][3] - Video streaming server module for Nginx with RTMP, (Apple) HLS and DASH support

[Video.js HTML5 video player][4] - Free HTML5 video player that automatically detects browser capabilities and switches to Flash when necessary

[Media sources][5] and [HLS][6] modules for Video.js player required for HLS live streaming support

## Lecture video

[The lecture video and slides][7]:

<!--more-->

<script async class="speakerdeck-embed" data-id="fc9209e635524e9e9373806443d0578b" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<video controls preload="none" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" width="960" height="720">
 <source src="{{ root_url }}/videos/webcamp_2015_jernej_virag_960x720_h264.mp4"  type="video/mp4; codecs=avc1.42E01E,mp4a.40.2">
</video>

 [1]: http://2015.webcamp.si/
 [2]: https://www.ffmpeg.org/download.html
 [3]: https://github.com/arut/nginx-rtmp-module
 [4]: http://www.videojs.com/
 [5]: https://github.com/videojs/videojs-contrib-media-sources
 [6]: https://github.com/videojs/videojs-contrib-hls
 [7]: http://video.webcamp.si/wc2015_virag_streaming_your_bedroom/

---
title: WebM web video encoding tutorial with FFMpeg
author: Jernej Virag
layout: post
comments: true
permalink: /2012/01/webm-web-video-encoding-tutorial-with-ffmpeg-0-9/
categories:
  - Computer stuff
  - Video encoding / FFmpeg
tags:
  - ffmpeg
  - html5
  - mobile
  - videos
  - web
  - webm
    
---
Previously I wrote about [encoding H.264 video for web][1]. Since video support in browsers [is kind of a mess][2], you'll be forced to re-encode videos to WebM (VP8/vorbis) format sooner or later if you want HTML5 playback. FFMpeg is able to use the official libvpx library, which makes it pretty easy. However, the support is still slightly buggy and the parameter mapping is non-obvious if you're used to encoding to other formats.
<!--more-->

So, let's start:

### Step 1: Get new FFmpeg and libvpx versions

libvpx is a rather new addition to FFmpeg and for quality reasons you really want to use the newest stable version of FFmpeg and libvpx. How to get those was described [in my previous article][1]. Just don't forget to compile in libvpx and libvorbis support.

### Step 2: Choose resolution and bitrate

You'll have to choose resolution and bitrate into which to encode. For general guidelines check [my previous article][1] and add about 10-15% to video bitrate. libfaac and libvorbis output quality is mostly comparable, so you can just keep the same settings.

### Step 3: Encode!

All the choices being made, now it's time to encode your video:

	ffmpeg -i input_file.avi -codec:v libvpx -quality good -cpu-used 0 -b:v 500k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 4 -vf scale=-1:480 -codec:a libvorbis -b:a 128k output.webm

<address>
  (I'm using new-style parameters introduced in latest FFmpegs, old-style parameters are being slowly deprecated because of ambiguity)
</address>

Two-pass encoding is of course also possible:

``` bash 1st pass
ffmpeg -i input_file.avi -codec:v libvpx -quality good -cpu-used 0 -b:v 500k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 4 -vf scale=-1:480 -an -pass 1 -f webm /dev/null`
```

``` bash 2nd pass
ffmpeg -i input_file.avi -codec:v libvpx -quality good -cpu-used 0 -b:v 500k -qmin 10 -qmax 42 -maxrate 500k -bufsize 1000k -threads 4 -vf scale=-1:480 -codec:a libvorbis -b:a 128k -pass 2 -f webm output.webm
```

As mentioned in the previous article, FFmpeg parameters are position sensitive, so be sure to maintain the order of parameters.

Now, let's break down the parameters for the encode:

**-i [input file]** - Specifies the name and path to the input file  

**-codec:v** - Specifies the video encoder to be used, in our case that is libvpx VP8 library  
**-quality good** - Sets encoding speed for the VP8 encoder. This works in concert with cpu-used parameter. Available values are `best`, `good` and `realtime`. The official libvpx documentation strongly advises against using `best` quality parameter, because `good` with `cpu-used 0` offers almost identical quality for half the encoding time.  
**-cpu-used [0-5]** - Sets "speed" of encoding " lower value uses more CPU for processing and produces better quality. Larger values trade quality for faster encoding, with 4 and 5 enabling "rate distortion optimization", which significantly speeds-up encoding with price of big quality hit.  
**-b:v [bitrate]** - Sets desired output video bitrate  
**-maxrate/-bufsize** - Set upper limits for stream bitrate, maxrate specifying maximum bitrate and bufsize specifying device buffer size. Buffer size tells the encoder how much it can overshoot the maximum bitrate when required. Good default is twice the maxrate for approx. 2sec of buffer.  
**-qmin 10 -qmax 42** - This sets minimum and maximum quantization values. Since as of 0.9, FFmpeg sets those values wrong by default, adding these is **required** for a a decent video quality. Omitting these will produce blocky broken video.  
**-threads [num]** - Sets number of encoding threads to use. Set to the number of your CPU cores available.
**-vf scale=[width:height]** - Rescales video to a chosen resolution. Value of "-1&#8243; means "size to keep aspect ratio", e.g. setting this to "-1:720&#8243; will produce a 720p output with same aspect ratio as input.

**-codec:a libvorbis** - Sets output audio encoder to libvorbis to produce vorbis output. This is required for a valid WebM file.
**-b:a [bitrate]** - Sets bitrate for encoded audio.
**-an** - disables audio, audio processing has no effect on first pass so itís best to disable it to not waste CPU.

**-f webm** - tells FFmpeg the output file format (required only if it cannot be inferred from output file extension).
**-pass [1|2]** - tells FFmpeg to process video in multiple passes and sets the current pass.

That's mostly all there is to it " other FFmpeg mappings for libvpx can be found in [the documentation][3]. It's also worth noting, that libvpx supports the "profile" parameter, which sets complexity of output stream, much like H.264 has. However, since devices with WebM support are very scarce, there currently isn't much documentation on which devices supports which profile.

### Some sample command lines:

These are analogous to the command lines in the H.264 article. Replace the thread count in `-threads` parameter with number of your CPU cores for optimal encoding speed.  

``` bash Standardî web video (480p at 600kbit/s)
ffmpeg -i input_file.avi -codec:v libvpx -quality good -cpu-used 0 -b:v 600k -maxrate 600k -bufsize 1200k -qmin 10 -qmax 42 -vf scale=-1:480 -threads 4 -codec:a vorbis -b:a 128k output_file.webm
```

``` bash High-quality SD video for archive/storage (PAL at 1.2Mbit/s):
ffmpeg -i input_file.avi -codec:v libvpx -quality good -cpu-used 0 -b:v 1200k -maxrate 1200k -bufsize 2400k -qmin 10 -qmax 42 -vf scale=-1:480 -threads 4 -codec:a vorbis -b:a 128k output_file.webm
```

 [1]: http://www.virag.si/2012/01/web-video-encoding-tutorial-with-ffmpeg-0-9/ "H.264 web video encoding tutorial with FFmpeg 0.9"
 [2]: http://en.wikipedia.org/wiki/HTML5_video#Table
 [3]: http://ffmpeg.org/ffmpeg.html#Options-5
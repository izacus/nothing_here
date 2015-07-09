---
title: H.264 web video encoding tutorial with FFmpeg
author: Jernej Virag
layout: post
comments: true

categories:
  - Video encoding / FFmpeg
tags:
  - ffmpeg
  - html5
  - mobile
  - videos
  - web
  
---
Web is full of articles about encoding videos with FFmpeg, however most of them are obsolete and use old non-working FFmpeg parameters. So here's my guide for encoding web videos using recent FFMpeg versions for Flash and HTML5.
<!--more-->

### Step 1: Get a new build of FFmpeg

Most distribution builds are very old, buggy and have numerous issues. Don't use them.

**Ubuntu users:** [UbuntuForums][1] has a great guide for compiling newest FFMpeg build. I strongly suggest you use a stable FFmpeg build (that's 0.9 at the moment) instead of git master. Don't forget libx264 for H.264 and libvpx for VP8/WEBM if you want that support.  
**Windows users:** [Zeranoe][2] has great static builds of FFmpeg for Windows with libx264 and libvpx included. Use those for encoding.  
**OS X users:** MacPorts should be able to compile and install FFmpeg with libvpx and libx264. As I don't use any machines with OS X you'll have to check for yourself.

*If you already know what "bitrates, profiles etc." are and just want the command lines [skip to step 4][3] or [sample command lines][4].*

### Step 2: Choose resolution, bitrate and profile

Now you'll have to decide on two things - the resolution, bitrate and profile you want those videos in.

**Resolution** gives "sharpness" to the overall image. If you choose a low resolution, the video will be small and it will be blurry when users will put it full-screen. Typically people use 360p (that's a shorthand naming made popular by HD televison, meaning picture has height of 360 with width corresponding to wanted aspect ratio), 480p, 720p and 1080p resolutions, as those correspond to common screen sizes, which avoids excessive blurriness.  
*Contrary to popular belief, resolution **does not** affect file size.*

**Bitrate** tells the encoder about how many bits should each second of video have. It directly determines file size of the video along with the quality. Set too low, it will cause the video to look very blocky (especially in fast-moving scenes) and set too high will make your files excessively large.  
When choosing bitrate you need to remember, it is directly connected to resolution - storing pictures of certain resolution requires more bits, so if you want higher resolution videos, you'll have to choose higher bitrate for them to not look like garbage.  
A rule of thumb to calculate file size from bitrate is:

`filesize (in MB) = (bitrate in Mbit/s * 8) * (video length in seconds)`

Some general resolution/bitrate guidelines that we've found to work well [at Viidea:][5]

| Resolution | Bitrate | Approximate size of 10min video |
|------------|:--------|:--------------------|
| 320p (mobile) | 180 kbit/s | ~13 MB |
| 360p       | 300 kbit/s | ~22MB |
| 480p       | 500 kbit/s | ~37MB |
| 576p (PAL) | 850 kbit/s | ~63MB |
| 720p       | 1000 kbit/s | ~75 MB |

<br />

The values in the table were optimized for lecture-type content recorded with SD cameras, so if you want to encode something more dynamic (like Transformers ;) ) I suggest you bump the bitrate up a little.

***Profile*** constrains H.264 to a subset of features - higher profiles require more CPU power to decode and are able to generate better looking videos at same bitrate. You should always choose the best profile your target devices support.

Basic support matrix for devices:

| Device | Max supported profile |
|--------|:---------------------|
|Desktop browsers, iPhone 4S+, iPad 2+, Android 4.x+ tablets, Xbox 360, Playstation 3 | High profile |
|iPhone 3GS, iPhone 4, iPad, low-end Android phones| Main profile |
|iPhone, iPhone 3G, old low-end Android devices, other embedded players| Baseline profile |

<br />

Remember, most devices also have a maximum resolution and bitrate they can handle. That is usually expressed in as a [H.264 level][6] and can be set in FFmpeg with -level parameter (this will make FFmpeg abort encoding of videos which couldn't be played on the device).

### Step 3: Choose audio format and bitrate

For audio, the choice is a lot simpler - if you want to encode for mobile devices I strongly suggest you use AAC+, which has a **very noticeable** improvement of audio quality at the same bitrate.With that in mind, AAC+ is perfect for podcasts, lectures and other speech content, since it retains quality even at low bitrates (difference between "normal" LC-AAC at 96 kbit/s vs. AAC+ at 64kbit/s is practically not noticeable).
You will need `libfdk_aac` compiled into your version of ffmpeg to encode into AAC+ profile and pass `-profile:a aac_he_v2` as a parameter.

Otherwise, rule of thumb is to take around 128 kbit/s for standard quality material and 192kbit/s for something more complex.  

<a name="step4"></a>
### Step 4: Encode!

So, you made all the hard choices and now it's time to encode your video. FFmpeg command line to encode a standard web video looks like this:

```bash
	ffmpeg -i input_file.avi -codec:v libx264 -profile:v high -preset slow -b:v 500k -maxrate 500k -bufsize 1000k -vf scale=-1:480 -threads 0 -codec:a libfdk_aac -b:a 128k output_file.mp4
```

You can also encode the video in two-passes, which gives the added benefit of quality increase and more accurate file size for given bitrate:

``` bash 1st pass
ffmpeg -i input_file.avi -codec:v libx264 -profile:v high -preset slow -b:v 500k -maxrate 500k -bufsize 1000k -vf scale=-1:480 -threads 0 -pass 1 -an -f mp4 /dev/null
```


``` bash 2nd pass
ffmpeg -i input_file.avi -codec:v libx264 -profile:v high -preset slow -b:v 500k -maxrate 500k -bufsize 1000k -vf scale=-1:480 -threads 0 -pass 2 -codec:a libfdk_aac -b:a 128k -f mp4 output_file.mp4
```

Scary isn't it?

**Warning:** ffmpeg command line arguments are position sensitive - make sure you don't mix up the order. Good rule of thumb to prevent mistakes is to keep the order of  

```bash
	ffmpeg [input options] -i [input filename] -codec:v [video options] -codec:a [audio options] [output file options] [output filename]
```

Let's break down all those parameters:

|Parameter            |     Meaning   |
|-----------------------------|:-------------|
**-i [input file]** | this specifies the name of input file  
**-codec:v libx264** | tells FFmpeg to encode video to H.264 using libx264 library  
**-profile:v high** | sets H.264 profile to "High" as per Step 2. Other valid options are baseline, main  
**-preset slow** | sets encoding preset for x264 &#8211; slower presets give more quality at same bitrate, but need more time to encode. "slow" is a good balance between encoding time and quality. Other valid options are: *ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow, placebo (never use this one)*  
**-b:v** | sets video bitrate in bits/s  
**-maxrate and -bufsize** | forces libx264 to build video in a way, that it could be streamed over 500kbit/s line considering device buffer of 1000kbits. Very useful for web - setting this to bitrate and 2x bitrate gives good results.  
**-vf scale** | applies "scale" filter, which resizes video to desired resolution. "720:480" would resize video to 720x480, "-1" means "resize so the aspect ratio is same." Usually you set only height of the video, so for 380p you set "scale=-1:380", for 720p "scale=-1:720" etc.  
**-threads 0** | tells libx264 to choose optimal number of threads to encode, which will make sure all your processor cores in the computer are used
**-codec:a libfdk_aac** | tells FFmpeg to encode audio to AAC using libfdk-aac library  
**-b:a** | sets audio bitrate in bits/s
**-pass [1 2]** | tells FFmpeg to process video in multiple passes and sets the current pass  
**-an** | disables audio, audio processing has no effect on first pass so it's best to disable it to not waste CPU

That's basically all there is to it.  

<a name="samples">
### Some sample command lines:

``` bash Standard web video (480p at 500kbit/s)
ffmpeg -i input_file.avi -codec:v libx264 -profile: high -preset slow -b:v 500k -maxrate 500k -bufsize 1000k -vf scale=-1:480 -threads 0 -codec:a libfdk_aac -b:a 128k output_file.mp4
```

``` bash 360p video for older mobile phones (360p at 250kbit/s in baseline profile)
ffmpeg -i inputfile.avi -codec:v libx264 -profile:v baseline -preset slow -b:v 250k -maxrate 250k -bufsize 500k -vf scale=-1:360 -threads 0 -codec:a libfdk_aac -b:a 96k output.mp4
```

``` bash 480p video for iPads and tablets (480p at 400kbit/s in main profile):
ffmpeg -i inputfile.avi -codec:v libx264 -profile:v main -preset slow -b:v 400k -maxrate 400k -bufsize 800k -vf scale=-1:480 -threads 0 -codec:a libfdk_aac -b:a 128k output.mp4
```

``` bash High-quality SD video for archive/storage (PAL at 1Mbit/s in high profile):
ffmpeg -i inputfile.avi -codec:v libx264 -profile:v high -preset slower -b:v 1000k -vf scale=-1:576 -threads 0 -codec:a libfdk_aac -b:a 196k output.mp4
```

If you're interested in encoding WebM instead of H.264, read the [next article :)][7]

 [1]: http://ubuntuforums.org/showthread.php?t=786095 "HOWTO: Install and use the latest FFmpeg and x264 "
 [2]: http://ffmpeg.zeranoe.com/builds/
 [3]: #step4
 [4]: #samples
 [5]: http://www.viidea.com/ "Viidea"
 [6]: http://en.wikipedia.org/wiki/H.264/MPEG-4_AVC#Levels
 [7]: http://www.virag.si/2012/01/webm-web-video-encoding-tutorial-with-ffmpeg-0-9/ "WebM web video encoding tutorial with FFMpeg 0.9"
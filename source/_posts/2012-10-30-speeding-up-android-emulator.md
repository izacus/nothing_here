---
title: Speeding up your Android emulator
author: Jernej Virag
layout: post
comments: true

categories:
  - Android
  - Helpful tips
tags:
  - android
  - emulator
  - linux
  - os x
  - programming
  - 'tips & tricks'
  - windows
  
---
Pretty much any Android developer has the same complaint: the emulator is slow to start and slower to run, making app testing very annoying. In last Android Development Tools iterations Google implemented several ways to speed up the emulator to make it usable.
<!--more-->

There are three ways to speed up the emulator:

1.  Using emulator snapshots for fast startup
2.  Using x86 hardware acceleration on Android images ver. 10 and 15+ (2.3.3 and 4.0.2+)
3.  Using GPU OpenGL acceleration for interface rendering on images ver 14+ (Android 4.x)

Sadly those methods are usable only on few emulator images (2.3.3 and 4.x+). Those are, however, the most widely used Android versions and are thus most widely used for development. Let's look at each of those methods in-depth.

## 1. Emulator snapshots

One of the most jarring annoyances with the emulator is the slow startup time, especially when using newer OS images. Even a machine with 16GB of RAM and a fast SSD can take several minutes to boot Android in the emulator.

Google has provided the solution for this problem in form of *Snapshots* - functionality very similar to [VirtualBox snapshot functionality][1] or desktop OS [hibernation][2]. After first boot the full emulator state is dumped to hard drive and on next startup the state gets read back to the memory without going through time-consuming Android startup procedure. This shortens boot time from several minutes to a couple of seconds.

To use snapshot functionality, you need to enable it in the AVD emulator settings when creating (or editing) a new emulator.

{% img /images/posts/2012_10_30_emulator.png 402 511 Emulator settings window with snapshots enabled %}

After enabling snapshot support in the emulator, you need to start it via the AVD manager by selecting the emulator, clicking **Start** and making sure the options **Launch from snapshot** and **Save to snapshot** are chosen. The emulator is then started with a click on **Launch**.

{% img /images/posts/2012_10_30_emulator_launch.png 722 570 Emulator launch with snapshot support %}

Each launch of the emulator (after first one, which will be slow) will now take only a second or two.

# 2. x86 hardware acceleration

Android usually runs on ARM architecture, which is very different from x86 architecture of desktop PCs and the emulator has to translate all OS instructions from ARM to x86 for Android to run. You can avoid that by using an Intel x86 image of Android with Intel HAXM accelerator.

On Windows and OS X you need to first install Intel HAXM execution manager, which will speed up x86 emulator execution:

1.  Download HAXM installer with Android SDK manager by selecting **Extras** -> **Intel Hardware Acceleration Execution Manager**
2.  Install HAXM by running **IntelHAXM.exe***(Windows)* or **IntelHAXM.dmg***(OS X)* from **extras/Intel/Hardware\_Accelerated\_Execution_Manager** folder. You can find `extras` directory in your Android SDK directory.

Linux users have to [Install KVM on Ubuntu][9] instead.

After installing HAXM you have to download Intel x86 emulator images with Android SDK Manager:

*   Android 4.1 (API 16) -> †Intel x86 Atom System Image
*   Android 4.0.3 (API 15) -> Intel x86 Atom System Image
*   Android 2.3.3 (API 10) -> Intel x86 Atom System Image

When image download is complete you just need to create an emulator using the image. The settings for 2.3.3 slightly differ from settings for 4.x emulator:

**For 2.3.3:** You need to choose `Intel Atom x86 System Image` as a target when creating new emulator.

{% img /images/posts/2012_10_30_intel_233.png 402 511 Creating Intel x86 emaulator with Android 2.3.3 %}

**For 4.x:** You need to choose `Android 4.0.3 API Level 15` or `Android 4.1 API Level 16` as a target and then select `Intel Atom (x86) CPU/ABI` setting.

Note: You MUST select an **Android** image, not *Google APIs* image to get a choice of Intel Atom ABI.

{% img /images/posts/2012_10_30_intel_403.png 402 511 Creating Intel x86 emulator with Android 4.0.3 %}

If you're using Windows or OS X you can now start the accelerated emulator.

**Linux users** have to make an extra step: because there's no HAXM module for Linux, Linux users have to add

	-qemu -m 512 -enable-kvm

to startup parameters of the emulator. This can be done in Eclipse when running your app (in `Run configuration` dialog).


{% img /images/posts/2012_10_30_run_configuration.png 493 326 Linux Intel Run configuration %}

More documentation is available on [Android Developer][7] pages.

# 3. OpenGL acceleration for interface

Android Emulator renders everything in software without help of GPU which is the main cause of terrible performance - especially when emulating tablets. This can be fixed by using OpenGL for all graphics in †the emulator on Android 4.0+.

GPU Acceleration is off by default and has to be enabled when creating an emulator by adding a `GPU Emulation` setting set to `yes`.


{% img /images/posts/2012_10_30_gpu_emulation.png 402 511 Fast Android 4.0.3 emulator with Intel image and GPU acceleration enabled %}

**NOTE:** Snapshots won't work on emulators with GPU emulation enabled.

Using Intel image with GPU acceleration or Android 4.x+ should make the emulator fast enough to test your app even on 720p+ tablets.

 [1]: http://www.virtualbox.org/manual/ch01.html#snapshots
 [2]: http://en.wikipedia.org/wiki/Hibernation_(computing)
 [7]: http://developer.android.com/tools/devices/emulator.html#accel-vm
 [9]: https://help.ubuntu.com/community/KVM/Installation
---
title: On Phonegap and mobile development
author: Jernej Virag
layout: post

categories:
  - My work
  - Rants
tags:
  - mobile
  - nokia
  - prevoz
  - programming
  - review
  - User interface
  
---
[PhoneGap][2] is a small JavaScript framework with big promises: it's promising easy development of cross-platform mobile apps - write your application once in combination of HTML, CSS and JavaScript, then publish it on Android Market, Apple AppStore and Nokia OviStore. It's goal is to expose platform-specific device capabilities in such a way, that you can run the application on all devices without any special per-platform customization.

If you are a mobile development and have started chuckling when reading the first paragraph: you were largely right. PhoneGap, despite the teams ambition, simply fails to deliver and is largely useless for mobile development.

But before the criticism, let's see what PhoneGap actually does right:

*   It offers a way to package web-applications, so they seem as native applications on the platform. That holds true for Nokia's WRT/Qt platforms, Android and iOS. Also the implementation is AppStore compatible, so there are no problems.
*   The APIs that are implemented (GPS for example) mostly actually work on phones on which PhoneGap applications are capable of running.

However, the list of things that make PhoneGap mostly useless is sadly a lot bigger:

*   The documentation is meager to non-existing, which makes determining capabilities of the framework prior actual application development almost impossible.
*   Most of the API is still not implemented and missing. For example the AJAX call implementation is missing, which means you need to either be happy with the lowest common denominator for AJAX capabilities (which is crippled, because ANY request made is cross-domain) or use device-specific capabilities.
*   While offering access to some hardware-related capabilities, it does not offer any usable user interface function to help cross the user-experience and device capability gap. That even poses the problem with such simple things as loading animations, where Android doesn't support any image animation, while Nokia and iPhone do.  
    This forces the developer to write platform-specific code, which defeats the purpose of cross-platform library.
*   On the same note, it lacks any UI widget interfaces or ability to create portable interface. PhoneGap would be truly usable if it would offer widget capability similar to Qt on desktop systems, where widgets get native display according to platform they are running on.
*   And one of the biggest problems for a web-enabled app is the lack of any cross-platform way of invoking the device browsers. This makes modern authentication schemes as are or OAuth impossible to implement.

Besides all those points, the framework is rather slow and buggy, which puts the last nail in the coffin of the framework. [PhoneGap in action][1] shows usefulness of the framework pretty accurately.

We decided to use PhoneGap when starting to develop Prevoz.org Nokia application for Nokia Application Academy, since it promised rapid prototype development and deployment, which could later be changed to native implementation when enough users would adopt it. However, it has proven to be completely unusable and as a warning to all other developers:<strong> </strong>

**Go native. Development is still faster than using PhoneGap and application offers better experience to the user.**

One rewrite and a lot of wasted time later, the application was developed in native Nokia WRT library with WRTKit widget framework:

{% img /images/posts/2010_07_29_ss.png 194 300 %}

 [1]: http://www.robcottingham.ca/cartoon/archive/phonegap-in-action/
 [2]: http://www.phonegap.com/
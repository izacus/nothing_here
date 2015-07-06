---
title: Debugging power problems in Windows 7
author: Jernej Virag
layout: post

robotsmeta:
  - index,follow
categories:
  - Helpful tips
tags:
  - power
  - 'tips & tricks'
  - win7
  - windows
  
---
Powercfg utility is known at least since the time of Windows Vista, mostly for setting basic power options. However, in Windows 7 the powercfg gained new analysis modes, where it can analyze power consumption of the system, making it effectively [powertop][1] for Windows.

Running `powercfg /energy` will start the energy analysis and store results in `energy-report.html` file in System32 directory containing results looking pretty much like these:

{% img /images/posts/2010_02_05_analysis.png 300 155 %}

Also, with `powercfg /requests` you can check what is currently blocking system sleep:

{% img /images/posts/2010_02_05_requests.png 300 151 %}

This hint was found on [The Old New Thing][2] blog.

 [1]: http://www.lesswatts.org/projects/powertop/
 [2]: http://blogs.msdn.com/oldnewthing/archive/2009/10/26/9912711.aspx
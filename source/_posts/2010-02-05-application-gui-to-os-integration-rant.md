---
title: Application GUI to OS integration rant
author: Jernej Virag
layout: post
permalink: /2010/02/application-gui-to-os-integration-rant/
categories:
  
---
I have no idea why exactly is it so hard to make sure a Java application integrates seamlessly into OS. Applications keep inventing their own file open dialogs (even though OS provides it's own with your user settings), using their own graphical widgets and doing everything to kill user interface consistency.

People, please read user interface guidelines for every OS you are targeting and make sure you conform to them. Even if that means that you need to write some OS dependent code. It will make your application a lot more "comfy" to use. There are few things as frustrating as an application opening its own "File open" dialog, which starts at filesystem root instead of opening the OS file open dialog with your workspace folder set as favourite, thus forcing you to navigate whole folder structure.

Here is a case of this crime against humanity (example of IntelliJ IDEA 9.0 interface on Windows 7):

{% img /images/posts/2010_02_05_idea.png %}
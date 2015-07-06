---
title: Convert OpenSSH private key to PuTTY private key for GitHub
author: Jernej Virag
layout: post

categories:
  - Computer stuff
  - Helpful tips
tags:
  - git
  - git extensions
  - github
  - openssh
  - ppk
  - programming
  - putty
  
---
Recently I started using [GitHub][1] as [Git][2] source control repository. I'm using [Git Extensions][3] for GUI repository management on Windows. When setting it up with GitHub I've followed the instructions in the [GitHub guide][4] and I ended up with my private SSH key generated in OpenSSH format.

Problem is, Git Extensions uses PuTTY for SSH communication, which stores its SSH keys in different format. The solution is using PuTTYgen (bundled with Git Extensions) to load the private key (which is stored in `id_rsa` file in `C:\Users\<username>\.ssh` folder if default settings were used) and then save it (be sure to use `Save private key` button) again in PuTTY .ppk file.

{% img /images/posts/2010_02_16_import.png 300 290 %}

After that, the SSH key in .ppk file has to be loaded into Git Extensions by clicking `Load SSH Key` in `Manage remote repositories` dialog.

{% img /images/posts/2010_02_16_remoterepos.png 300 112 %}

 [1]: https://github.com/
 [2]: http://en.wikipedia.org/wiki/Git
 [3]: http://sourceforge.net/projects/gitextensions/
 [4]: http://help.github.com/msysgit-key-setup/
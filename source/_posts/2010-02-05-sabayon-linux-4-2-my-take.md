---
title: Sabayon Linux 4.2, my take
author: Jernej Virag
layout: post

comments: true
categories:
  - Computer stuff
  - Helpful tips
tags:
  - linux
  - review
  - sabayon
  
---
Even though most people know me as a profound Linux critic, I've always been somewhat of a fan of [Gentoo][1] distribution. The greatest appeal of it was it's rather simple and straightforward organization of configuration files and ability to customize the distribution to the tiniest of details.

However, constantly waiting for portage to complete its compilation of source packages quickly grew tiresome on my slow server, not to mention that portage can be too bleeding edge for a server system, occasionally breaking important services. The problem grows even bigger on a desktop system, because large pieces of critical software (X.org, GNOME, OO.org, Firefox) can take hours to compile and update. That was the main reason I abandoned Gentoo.

However, a new bastard child of Gentoo lately got my attention: [Sabayon Linux][2]. It's a portage based binary distribution, meaning that pretty much all packages come precompiled. As such, it sounded like a godsend to me, so I threw on a test install on my faithful Dell XPS M1330.

The first impression with the distribution was very positive: the artworks and theming is done very well, all the way from Sabayon themed grub, over framebuffered boot screen to the Sabayon themed GNOME desktop. Even though it uses a dark theme which I profoundly dislike, it's well done all the way from theme colors, over background, cursors, tray/application icons to the nice login screen.

The authors claim they are not bothered by different opensource philosophies, they just want their distribution to be simple and they want everything to work out of the bux. Abiding by that fact the Sabayon comes preloaded with proprietary nVidia and ATi drivers, XBMC and even World of Goo demo. This is a pleasant surprise, since that means my dual display configuration on GeForce 8400M GS worked out-of-the-box, along with any media playback.

Now, enough about first impressions, let's take a look about the single thing that makes this distribution different from others: package management.

*Entropy* as they call their package manager (with *Sulfur* being the graphical frontend) pulls compiled packages from Gentoos portage repositories and installs them on system while taking all required actions to register ebuilds as installed into the Gentoos portage snapshot installed on the system as well. Entropy is blazingly fast (in my experience even slightly faster than Debian/Ubuntus Apt) and was able to install pretty much anything that exists in Gentoos portage repository without breaking anything. Using the package manager makes the experience very similar to that of using Ubuntu or any other binary based distribution with the difference of speed.

However the main difference lies in the fact, that the `emerge` command from Gentoo is available and the portage repository of Sabayon is actually the portage repository of Gentoo. Consequently that means that you can install any package from source exactly the same way as you would on Gentoo. By default the /etc/make.conf is configured with the same use flags as binary packages and *Entropy* tries hard to sync up with the portage, which means you can easly mix binary and source packages without breaking things. You can even do `emerge world` from Gentoo repositories and should go through without a hitch.

All in all Sabayon is a pleasant surprise when it comes to Linux distributions. The binary packages get rid of the greatest flaw of Gentoos portage while keeping its organisation. Having portage still installed and compatible means you still keep customizability of Gentoo without losing too much time and the "everything should work out of the box" mindset of creators means you're not bothered by missing drivers or codecs when installing the distribution.

Some downsides still remain however: portage packages can sometimes still be *too* bleeding edge and small community means that it's slightly harder to find good support.

Recommended.

 [1]: http://www.gentoo.org/
 [2]: http://www.sabayonlinux.org/
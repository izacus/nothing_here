---
title: ZFS-Fuse 0.6.9 on Ubuntu Lucid Lynx
author: Jernej Virag
layout: post
permalink: /2010/06/zfs-fuse-0-6-9-on-ubuntu-lucid-lynx/
jd_tweet_this:
  - yes
jd_twitter:
  - '#title# - #url#'
wp_jd_bitly:
  - http://bit.ly/bvyexK
wp_jd_target:
  - http://bit.ly/bvyexK
jd_wp_twitter:
  - ' ZFS-Fuse 0.6.9 on Ubuntu Lucid Lynx - http://bit.ly/bvyexK'
categories:
  - Computer stuff
tags:
  - fuse
  - ubuntu
  - zfs
  - zfs-fuse
  
---
On 4th of June the ZFS-Fuse project has released new stable version of the ZFS filesystem for Linux.

Notable new features in the 0.6.9 version are:

*   ZFS pool updated to version 23
*   deduplication support
*   zpool split capability
*   lowered and optimized memory consumption
*   numerous bug and stability fixes

According to several sources, the zfs-fuse is mature and stable enough to trust data to it. ZFS is still the most advanced filesystem available and it still offers more usable features than even upcoming btrfs.

**EDIT: The official packages for Lucid Lynx are now available on [ZFS-Fuse][1] project site so rest of the article is obsolete.**

Because in Ubuntu Lucid repositories the package version is still 0.6.0, I've built my own packages and published them in my PPA.

To install zfs-fuse in Ubuntu 0.6.9 add repositories in Terminal:

	sudo add-apt-repository ppa:jernej/zfs-fuse

To install just find zfs-fuse package in Synaptic or run in Terminal

	apt-get install zfs-fuse

Report for full hands-on experience with ZFS on Ubuntu will have to wait until I get replacement hardware for my NAS server system.

[1]: http://zfs-fuse.net/
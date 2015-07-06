---
title: Must-have libraries in modern Android developer toolbox
author: Jernej Virag
layout: post
comments: true

categories:
  - Android
tags:
  - android
  - programming
  - 'tips &amp; tricks'
  - User interface
  
---
Android is a platform that for better or for worse runs on wide variety of devices and causes a lot of "fragmentation" complaints by less experienced developers. And while the screen/resolution issues can be decently solved by having a competent designer (see: web development), version fragmentation poses a more significant problem - only 7.1% of all Android devices run 4.x versions, while the rest are suck on older Androids with little hope for update.

{% img /images/posts/2012_06_02_chart.png 460 250 'Android version distribution' %}

Ice Cream sandwich (and Honeycomb before it) brought significant improvements to the Android API, which significantly ease cross-device development and thanks to efforts of several developers a large part of those changes were backported in form of libraries for Android 2.x.

The most headache-easing libraries for Android development I've found so far are:
<!--more-->

## [1. Android Support Package][2]

This is official Google library which backports [Fragments][3] an [Loaders][4].

*   **[Fragments][3]** add a way to manage only part of displayed activity life-cycle and are critical part of tablet user interfaces - especially if you want to develop apps which work on phones and tablets without publishing separate APKs.
*   **[Loaders][4]** are a high-level interface for retrieving data from slow sources (network or database). Android runtime caches the loaders by their ID across Activity life-cycle, which means easy management and caching of remote data without writing boiler-plate AsyncTask code to keep state across orientation changes.

## [2. Action Bar Sherlock][5]

ABS is a library by [Jake Wharton][6] that backports the [Action bar API][7] to Android 2.x.

Action bar is a new Android paradigm, which is composed of a top bar with application name and implements tab navigation, menu replacement and "up" navigation. Pretty much **any ** Android app has an action bar (or at least should have) and this API is the easiest way to implement it. It also handles tab navigation with optional split mode (you **should not** use TabHost anymore) and menu buttons on devices without physical keys (e.g. Galaxy Nexus) and moves icons to menu when screen space runs out.

{% img /images/posts/2012_06_02_boid.png 168 300 'Boid Twitter client with split action bar' %}

More details of how to use action bar (and why it's important) are available on [Android Design page][9].

Seriously, if you're not using it yet, you should.

## [3. Action Bar Style Generator][10]

[Action Bar Style Generator][10] is a nice little web tool by [Jeff Gilfelt][11], which generates styles and 9-patch images in selected colors. It's compatible with before-mentioned ActionBarSherlock library and is a must-have if you want custom branded application.

## [4. Nine Old Androids][12]

[Nine Old Androids][12] is another gem from [Jake Wharton][6], which ports 3.x+ animation API to Android 1.x+.

Android animation pre-3.x was very clunky and required XML files to do anything useful. Honeycomb made everything easier (but not perfect) by introducing [view property animators][13]. This is thus a must-have for an app that wants to be compatible with 2.x and visually appealing at the same time.

## [5. Pull-to-Refresh][14]

[Pull-to-Refresh][14] allows you to implement the iOS-ish paradigm of pulling a ListView to refresh content.

{% img /images/posts/2012_06_02_ptr.png 300 152 'Pull-to-refresh example' %}

**NOTE**: Pull-to-refresh is a distinctly non-Android way of refreshing content, I suggest adding a separate "Refresh" option to the menu (e.g. like Boid Twitter client) to avoid user confusion.

## [6. RoboGuice][15]

[RoboGuice][15] is a dependency-injection framework for Android, which works perfectly for Android UI elements and services. It helps eliminate all those pesky findViewById(), getIntent().getExtras() calls littering the Activity code, making it more readable and (because of some added checks) less error-prone.

There were some problems using both RoboGuice and ABS in the same project (since both extend the Activity class), however this issue has been fixed in latest version of ABS [see example][16] on ABS GitHub.

## [7. ViewPagerIndicator][17]

Android Support Library also adds support for horizontally scrolling [ViewPager][18], which allows you to put several fragments side by side and allow user to swipe between them. However, the API is missing a position indicator similar to the one in Google+ and Play Market apps. Such customizable indicator is provided by [ViewPagerIndicator][17] library.

{% img /images/posts/2012_06_02_tabs.png 300 89 'View pager indicator tabs' %}

## [8. AQuery][20]

Noone in their right mind would say Java is a concise language - it often needs alot of boilerplate code to do things. [AQuery][20] is a library that tries to fix this problem by adding a more fluent API over Android platform API, cleaning up your codebase.

Thanks to [Damjan Malis][21] for last two suggestions.

That's it for now, if there are any other great Android libraries I'd be happy to know.

 [2]: http://developer.android.com/sdk/compatibility-library.html
 [3]: http://developer.android.com/guide/topics/fundamentals/fragments.html
 [4]: http://developer.android.com/guide/topics/fundamentals/loaders.html
 [5]: http://actionbarsherlock.com/
 [6]: http://jakewharton.com/
 [7]: http://developer.android.com/guide/topics/ui/actionbar.html
 [8]: https://play.google.com/store/apps/details?id=com.teamboid.twitter
 [9]: http://developer.android.com/design/patterns/actionbar.html
 [10]: http://jgilfelt.github.com/android-actionbarstylegenerator/
 [11]: https://twitter.com/#!/readyState
 [12]: http://nineoldandroids.com/
 [13]: http://android-developers.blogspot.com/2011/05/introducing-viewpropertyanimator.html
 [14]: https://github.com/chrisbanes/Android-PullToRefresh
 [15]: http://code.google.com/p/roboguice/
 [16]: https://github.com/JakeWharton/ActionBarSherlock/tree/master/samples/roboguice
 [17]: http://viewpagerindicator.com/
 [18]: http://developer.android.com/reference/android/support/v4/view/ViewPager.html
 [20]: http://code.google.com/p/android-query
 [21]: https://twitter.com/#!/malisd
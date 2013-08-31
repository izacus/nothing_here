---
title: Converting UTC struct_time to datetime in Python
author: Jernej Virag
layout: post
comments: true
permalink: /2012/10/converting-utc-struct_time-to-datetime-in-python/
categories:
  - Helpful tips
tags:
  - python
  - timezones
  - 'tips & tricks'
  
---
Getting from a Python struct_time object holding time in UTC to datetime object with timezone information isn't as trivial as it should be.
<!--more-->

So a handy self note:

``` python
import pytz
import calendar
import datetime

def to_datetime_from_utc(time_tuple):
    return datetime.fromtimestamp(calendar.timegm(time_tuple), tz=pytz.utc)
```

This converts struct_time object to epoch time using calendar.timegm(). timegm() function interprets passed time tuple as UTC time. Then we convert the epoch time to datetime object with added timezone information.

Hope this helps anyone else.
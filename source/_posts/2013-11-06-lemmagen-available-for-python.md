---
title: Lemmagen slovenian lemmatizer available for python
author: Jernej Virag
layout: post
comments: true
categories:
  - Helpful tips
  - My work
  - Text mining
  - Python
tags:
  - python
  - lemmagen
  - lemmatizer
  - text mining
  
---
In last days I've managed to finish my wrestling with Pythons awful packaging systems and have managed to publish Lemmagen lemmatizer to Python Pypi repository.

To install it just run

```python
pip install Lemmagen
```

inside your favorite Python/virtualenv environment. Note that installation requires a working C++ compiler for your platform.

Then to use it, instantiate `Lemmatizer` class and call `lemmatize()` on it. By default the lemmatizer is instantiated with slovenian dictionary, others are avaiable via `dictionary` keyword argument to the constructor.

```python Lemmatizer example

import lemmagen.lemmatizer
from lemmagen.lemmatizer import Lemmatizer

lemmatizer = Lemmatizer(dictionary=lemmagen.DICTIONARY_SLOVENE)
print lemmatizer.lemmatize("hodimo")

```

The source of the bindings is available as a part of Lemmagen [slovene_lemmatizer][1] project. The project is licensed under LGPLv2.


 [1]: https://bitbucket.org/mavrik/slovene_lemmatizer
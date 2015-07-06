---
layout: post
title: "Project spotlight: Slovenian part-of-speech tagger for Python"
permalink: /2014/07/project-spotlight-slopos/
date: 2014-07-12 14:14:47 +0200
comments: true
categories: 
- Text mining
- My Work
- Python
---

Slovenian language has a terrible lack of widely available tools for text processing so about a year ago I had to build my own part-of-speech tagger based on widely available [IJS JOS-1M corpus][1] with help of [NLTK][2] library.
Afterwards I published it on [my GitHub account][3] as a collection of scripts to train a model which wasn't really widely useful.

So now I've fixed the situation by publishing a pre-built version of the POS tagger on [PyPi][4] with updated usage and documentation.

To use it, just install it with `pip`:

```bash
pip install slopos
```

This will install the tagger and it's dependencies NLTK and PyYAML. 

To use just call `tag` method on `slopos` module:

```python
import slopos
tags = slopos.tag("Jaz sem iz okolice Ljubljane")

print tags
[('Jaz', 'ZOP-EI'),
 ('sem', 'GP-SPE-N'),
 ('iz', 'DR'),
 ('okolice', 'SOZER'),
 ('Ljubljane', 'SLZER.')]

```

_Note that `import slopos` will take awhile - it has to load and unpack the tagger._

The tagger tokenizes the sentence automatically and returns the result in form of `(word, tag)` tuples. Tags are constituted from sequence of letters, where each subsequent letter gives more detailed classification of the word. The first letter always denotes general word class (e.g. S - noun, G - verb, etc.). Words that cannot be classified are marked with tag `-None-`.

Full tag reference is available in [tag_reference-sl.txt][5] file on GitHub.

The project is still available on [GitHub][3] under LGPLv2.1 license. Any contribution and bug fixes in form of a pull request is very appreciated.

[1]: http://nl.ijs.si/jos/jos1M-sl.html
[2]: http://www.nltk.org/
[3]: https://github.com/izacus/slo_pos
[4]: https://pypi.python.org/pypi/SloPOS
[5]: https://raw.githubusercontent.com/izacus/slo_pos/master/tag_reference-sl.txt
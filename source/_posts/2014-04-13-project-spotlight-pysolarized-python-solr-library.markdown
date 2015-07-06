---
layout: post
title: "Project spotlight: PySolarized Solr library"
permalink: /2014/04/project-spotlight-pysolarized/
date: 2014-04-13 18:12:35 +0200
comments: true
categories: 
 - Helpful tips
 - Python
 - Solr
 - Text mining
---

There are numerous Python/Solr libraries out there, each having a different subset of functionality. Obviously, as per Murphy's law, none of them had a set of features I required. So I rolled my own - [PySolarized][1]!

I wrote PySolarized because I needed a Solr connector which would dispatch and query documents to multiple cores. 

To use PySolarized just grab it from PyPi:

```bash
pip install pysolarized
```

#### 1. Create an instance of Solr object. 

For a simple single-server configuration pass server endpoint as a string

```python
import pysolarized
solr = pysolarized.solr.Solr("http://localhost:8080/solr/core1")
```

If you want to use multi-language / multicore configuration pass dictionary of cores with their language identifiers:

```python
import pysolarized
solr = pysolarized.solr.Solr({"en": "http://localhost:8080/solr/core-en", "si": "http://localhost:8080/solr/core-si"}, default_endpoint="en")
```

Afterwards, you use this solr instance to communicate with Solr server. 

#### 2. Query

Use `query` method on the created solr instance.

```python
results = solr.query("Ljubljana", 
                    filters = {"country": "Slovenia" },
                    columns = ["id", "city_name"],
                    sort = ["city_name desc"],  
                    start = 0,
                    num_rows = 20)                  
```

The query method will automatically query all configured Solr cores and return aggregated results.

#### 3. Insert documents

To send new documents to Solr server you just pass a list of documents in dictionary form to the `add` method:

```python
solr.add([ { "id": "c1en", "city_name": "Vienna", "country": "Austria", "language": "en" }, 
           { "id": "c1si", "city_name": "Dunaj", "country": "Avstrija", "language": "si"}])
solr.commit()
```

PySolarized will use value of the `language` field to choose which core to send the document to - e.g. `"language": "si"` field in the document will cause PySolarized to send document to core with `si` identifier. Documents with unknown or missing language value will be sent to default endpoint.
Don't forget to call `commit` to commit changes in documents.

PySolarized can also delete documents, clear are cores and do "More Like This" queries.
Project is available on [GitHub][1] with a detailed documentation for rest of the functionality.

 [1]: https://github.com/izacus/pysolarized
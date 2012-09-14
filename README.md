refreshr [![Build Status](https://secure.travis-ci.org/CMTegner/refreshr.png)](http://travis-ci.org/CMTegner/refreshr)
=======
refreshr is a tool which uses JSONP to poll for changes in an arbitrary directory and automtaically refreshes the webpage when any changes are detected.

Installation
============
```
› npm install -g refreshr
```

Usage
=====
Start refreshr in the directory you wish to watch:

```
› refreshr
<script src="http://localhost:9898/refreshr.js"></script>
```


Copy the script-tag and paste it into your .html file. Your webpage will automatically reload itself when changes are made to files contained in the directory where you started `refreshr`.


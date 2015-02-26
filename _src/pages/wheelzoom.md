---
title: Wheelzoom
template: post
description: A script to zoom IMG elements on mousewheel or touchpad scroll.
permalink: /wheelzoom/
---

<a href="http://github.com/jackmoore/wheelzoom/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<script src='/js/wheelzoom.js'></script>

<img id='wheelzoom' src='/img/daisy.jpg' width='555' height='320' alt='Daisy on the Ohoopee'>

<script>
	wheelzoom(document.querySelector('#wheelzoom'));
</script>

___

<p>Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>, source on <a href='http://github.com/jackmoore/wheelzoom'>Github</a> (<a href='http://github.com/jackmoore/wheelzoom#changelog'>changelog</a>)</p>

<a class='download' href='https://github.com/jackmoore/wheelzoom/archive/master.zip'><i class='icon-download-alt'></i> Download</a>

Compatible with: Chrome, Firefox 17+, Safari, Opera, Internet Explorer 9+.</p>

## Usage:

```javascript
// assign wheelzoom
wheelzoom(document.querySelectorAll('img'));

// assign and set the zoom percent
wheelzoom(document.querySelectorAll('img'), {zoom:0.05});

// zooming out can be triggered by calling 'wheelzoom.reset'
document.querySelector('img').dispatchEvent(new CustomEvent('wheelzoom.reset'));

// wheelzoom can be removed from an element by calling 'wheelzoom.destroy'
document.querySelector('img').dispatchEvent(new CustomEvent('wheelzoom.destroy'));
```
### Wheelzoom doesn't change the DOM.  It works by sizing and positioning background-size and background-position styles.

Wheelzoom replaces an img's background-image with it's src.  Then the src is set to a transparent image.  The benefit to using a background-image is that plugin does not change the DOM or the positioning of the img element. This means that the plugin should Just Work™ regardless of your specific CSS or markup.  The drawback that there is no support for background-sizing in older browsers (IE8).  The img element is left unmodified for unsupported browsers.

The [source](https://raw.github.com/jackmoore/wheelzoom/master/wheelzoom.js) is short and well commented if you are curious to how it works. Email me if you run into any bugs.
---
title: jQuery Wheelzoom
layout: post
meta: A plugin to enlarge IMG elements on mousewheel or touchpad scroll.
permalink: /wheelzoom/
---

<a href="http://github.com/jackmoore/wheelzoom/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<script src='/js/jquery.js'></script>

<script src='https://raw.github.com/jackmoore/wheelzoom/master/jquery.wheelzoom.js'></script>

<img id='ex1' src='https://raw.github.com/jackmoore/wheelzoom/master/daisy.jpg' width='555' height='320' alt='Daisy on the Ohoopee'/>

<script>
	$('#ex1').wheelzoom();
</script>

## Download

<p><a href='https://raw.github.com/jackmoore/wheelzoom/master/jquery.wheelzoom.js'>Current version</a> ( Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a> | <a href='http://github.com/jackmoore/wheelzoom/tree/master'>Github</a> )</p>


Support: Chrome, Firefox 17+, Safari, Opera, Internet Explorer 9+.


## Usage:

````javascript
$('img').wheelzoom();

// or zoom sets the zoom percent.
$('img').wheelzoom({zoom:0.05});

// zooming out can be triggered by calling 'wheelzoom.reset'
$('img').trigger('wheelzoom.reset')
````
### Wheelzoom doesn't change the DOM.  It works by sizing and positioning background-size and background-position styles.

Wheelzoom replaces an img's background-image with it's src.  Then the src is set to a transparent PNG.  The benefit to using a background-image is that plugin does not change the DOM or the positioning of the img element. This means that the plugin should Just Work™ regardless of your specific CSS or markup.  The drawback that there is no support for background-sizing in older browsers (IE8).  The img element is left unmodified for unsupported browsers.

The [source](https://raw.github.com/jackmoore/wheelzoom/master/jquery.wheelzoom.js) is short and well commented if you are curious to how it works. Email me if you run into any bugs.
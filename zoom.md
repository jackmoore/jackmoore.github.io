---
title: jQuery Zoom
layout: post
meta: A plugin to enlarge images on mouseover or mousedown.
permalink: /zoom/
---

<a href="http://github.com/jackmoore/zoom/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<script src='/js/jquery.js'></script>
<script src='/js/jquery.zoom.js'></script>

<span class='zoom' id='ex1'>
  <span>Hover</span>
  <img src='https://raw.github.com/jackmoore/zoom/master/daisy.jpg' width='555' height='320' alt='Daisy on the Ohoopee'/>
</span><span class='zoom' id='ex2'>
  <span>Grab</span>
  <img src='https://raw.github.com/jackmoore/zoom/master/roxy.jpg' width='290' height='320' alt='Roxy on the Ohoopee'/>
</span>


<h2><a href='https://github.com/jackmoore/zoom/archive/master.zip' style='text-decoration: underline;'>Download</a></h2>

<p>Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>.  Source on <a href='http://github.com/jackmoore/zoom'>Github</a> (<a href='http://github.com/jackmoore/zoom#changelog'>changelog</a>).<br/>
  Compatible with: jQuery 1.7+ in Chrome, Firefox, Safari, Opera, Internet Explorer 7+.</p>
<p>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=zoom&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=zoom&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe></p>

## Instructions

**Zoom appends html inside the element it is assigned to, so that element has to be able to accept html**, like `<a>`, `<span>`, `<li>`, `<div>`, etc.  This excludes `<img>` elements (see below).

````javascript
// Example:
$(document).ready(function(){
  $('a.photo').zoom({url: 'photo-big.jpg'});
});

// Using ColorBox with Zoom
$(document).ready(function(){
  $('a.photo').zoom({
    url: 'photo-big.jpg', 
    callback: function(){
      $(this).colorbox({href: this.src});
    }
  });
});
````

To use zoom with `img` elements, they will need to be wrapped with another element. It is impossible to read some layout related CSS styles from JavaScript (percent-based width and height, margins set to auto, etc.) so the safe thing to do is to defer this change to individual site owners.  The following is all that is needed in some cases:

````javascript
$(document).ready(function(){
  $('img')
    .wrap('<span style="display:inline-block"></span>')
    .css('display', 'block')
    .parent()
    .zoom();
});
````

## Settings

<table>
  <tr>
    <th>Property</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>url</td>
    <td>false</td>
    <td>The url of the large photo to be displayed.  If no url is provided, zoom uses the src of the first child IMG element inside the element it is assigned to.</td>
  </tr>
  <tr>
    <td>on</td>
    <td>'mouseover'</td>
    <td>The type of event that triggers zooming.  Choose from <code>mouseover</code>, <code>grab</code>, <code>click</code>, or <code>toggle</code>.</td>
  </tr>

  <tr>
    <td>duration</td>
    <td>120</td>
    <td>The fadeIn/fadeOut speed of the large image.</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>false</td>
    <td>A function to call once the image has loaded.  The execution context of the callback will be set to the image element.</td>
  </tr>
</table>
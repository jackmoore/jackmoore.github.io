---
title: jQuery Zoom
template: post
description: A plugin to enlarge images on touch, click, or mouseover.
permalink: /zoom/
---

<a href="http://github.com/jackmoore/zoom/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<span class='zoom' id='ex1'>
  <span>Hover</span>
  <img src='/img/daisy.jpg' width='555' height='320' alt='Daisy on the Ohoopee'>
</span><span class='zoom' id='ex2'>
  <span>Grab</span>
  <img src='/img/roxy.jpg' width='290' height='320' alt='Roxy on the Ohoopee'>
</span>

___

<p>Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>, source on <a href='http://github.com/jackmoore/zoom'>Github</a> (<a href='http://github.com/jackmoore/zoom#changelog'>changelog</a>) &nbsp;<iframe style='vertical-align: middle' src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=zoom&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe> <iframe style='vertical-align: middle' src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=zoom&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe></p>

<a class='download' href='https://github.com/jackmoore/zoom/archive/master.zip'><i class='icon-download-alt'></i> Download</a>

Compatible with: jQuery 1.7+ in Chrome, Firefox, Safari, Opera, Internet Explorer 7+.

##### Install via Bower
```bash
bower install jquery-zoom
```

## Instructions

**Zoom appends html inside the element it is assigned to, so that element has to be able to accept html**, like `<a>`, `<span>`, `<li>`, `<div>`, etc.  This excludes `<img>` elements (see below).

```javascript
// Example:
$(document).ready(function(){
  $('a.photo').zoom({url: 'photo-big.jpg'});
});

// Using Colorbox with Zoom
$(document).ready(function(){
  $('a.photo').zoom({
    url: 'photo-big.jpg', 
    callback: function(){
      $(this).colorbox({href: this.src});
    }
  });
});
```

To use zoom with `img` elements, they will need to be wrapped with another element. It is impossible to read some layout related CSS styles from JavaScript (percent-based width and height, margins set to auto, etc.) so the safe thing to do is to defer this change to individual site owners.  The following is all that is needed in some cases:

```javascript
$(document).ready(function(){
  $('img')
    .wrap('<span style="display:inline-block"></span>')
    .css('display', 'block')
    .parent()
    .zoom();
});
```

## Removing Zoom

Trigger the `zoom.destroy` event to remove zoom from an element:

```javascript
$('#example').zoom(); // add zoom
$('#example').trigger('zoom.destroy'); // remove zoom
```

## Settings

<table>
  <tr>
    <th>Property
    <th>Default
    <th>Description
  <tr>
    <td>url
    <td>false
    <td>The url of the large photo to be displayed.  If no url is provided, zoom uses the src of the first child IMG element inside the element it is assigned to.
  <tr>
    <td>on
    <td>'mouseover'
    <td>The type of event that triggers zooming.  Choose from <code>mouseover</code>, <code>grab</code>, <code>click</code>, or <code>toggle</code>.
  <tr>
    <td>duration
    <td>120
    <td>The fadeIn/fadeOut speed of the large image.
  <tr>
    <td>target
    <td>false
    <td>A selector or DOM element that should be used as the parent container for the zoomed image.
  <tr>
    <td>touch
    <td>true
    <td>Enables interaction via touch events.
  <tr>
    <td>magnify
    <td>1
    <td>This value is multiplied against the full size of the zoomed image.  The default value is 1, meaning the zoomed image should be at 100% of it's natural width and height.
  <tr>
    <td>callback
    <td>false
    <td>A function to be called when the image has loaded.  Inside the function, `this` references the image element.
  <tr>
    <td>onZoomIn
    <td>false
    <td>A function to be called when the image has zoomed in.  Inside the function, `this` references the image element.
  <tr>
    <td>onZoomOut
    <td>false
    <td>A function to be called when the image has zoomed out.  Inside the function, `this` references the image element.
</table>

<script src='/js/jquery.js'></script>
<script src='/js/jquery.zoom.js'></script>

<script>
  if ($ && $.fn.zoom) {
    $('#ex1').zoom();
    $('#ex2').zoom({ on:'grab' });
  }
</script>
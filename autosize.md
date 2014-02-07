---
title: jQuery Autosize
layout: post
meta: A plugin to automatically adjust textarea height.
permalink: /autosize/
---

<a href="http://github.com/jackmoore/autosize/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<textarea id='ta2'>Autosize with a CSS transition.
Try typing something...</textarea>
<textarea id='ta1'>Autosize with no animation.</textarea>

<h2><a href='https://github.com/jackmoore/autosize/archive/master.zip' style='text-decoration: underline;'>Download</a></h2>

Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>.  Source on <a href='http://github.com/jackmoore/autosize'>Github</a> (<a href='http://github.com/jackmoore/autosize#changelog'>changelog</a>).<br/>
Compatible with: jQuery 1.7+ in Chrome, Firefox 4+, Safari 5+, Internet Explorer 6+, Opera 11+.<br/>
Bower Package: `jquery-autosize`

<p>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=autosize&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=autosize&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe></p>

## Usage

````javascript
// Example:
$(document).ready(function(){
	$('textarea').autosize();	
});
````

Drop Autosize into any existing website and it should <em>Just Work</em>&trade;. <a href='https://raw.github.com/jackmoore/autosize/master/jquery.autosize.js'>The source</a> is short and well commented if you are curious to how it works.

## Manual Triggering

Autosize has no way of knowing when the value of a textarea has been changed through JavaScript.  If you do this, trigger the `autosize.resize` event immediately after to update the height.  Example:

````javascript	
$('#example').val('New Text!').trigger('autosize.resize');
````

## Removing Autosize

Trigger the `autosize.destroy` event to remove autosize from a textarea element:

````javascript	
$('#example').trigger('autosize.destroy');
````

## Settings

<table>
	<tr>
		<th>Property</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>className</td>
		<td>'autosizejs'</td>
		<td>The className property is used to specify a class for the mirrored element, in case it's necessary to explicitly set a style on the mirrored element (see the note about line-height below).</td>
	</tr>
	<tr>
		<td>append</td>
		<td>''</td>
		<td>For appending whitespace to the end of the height calculation (an extra newline improves the apperance when animating).  Example <code>$('.textarea').autosize({append: "\n"});</code></td>
	</tr>
	<tr>
		<td>callback</td>
		<td>false</td>
		<td>A function to call when the textarea is resized.</td>
	</tr>
</table>

## Known Issues &amp; Solutions


### Incorrect size with hidden textarea elements

Autosize needs to be able to calculate the width of the textarea element when it is assigned.  JavaScript cannot accurately calculate the width of an element that has been removed from the document flow.  If you want to assign Autosize to a hidden textarea element, be sure to either specify the pixel width of the element in your CSS, or trigger the `autosize.resize` event after you reveal the textarea element.

<strong>Possible ways to resolve:</strong>

* Specify an exact width for the textarea element in your stylesheet.

* Trigger the `autosize.resize` event after the element has been revealed.

```javascript
$('textarea.example').autosize().show().trigger('autosize.resize');
```

* Wait until after the textarea element has been revealed before assigning Autosize.

```javascript
$('textarea.example').fadeIn(function(){
	$(this).autosize();
});
```

* Wait until the textarea has been focused by the user before assigning Autosize.

```javascript
$('textarea.example').on('focus', function(){
	$(this).autosize();
});
```


### Incorrect size in IE8:

Autosize adds a hidden textarea element to your document that mirrors the original textarea's input.  This mirrored textarea is used to calculate the size that the original textarea should be.  The mirrored textarea copies the original textarea's styles that relate to text formatting.

One copied style is `line-height`, and IE8 does not accurately report the line-height value for textarea elements. This is not an issue when the line-height is specified for the bare textarea selector (ie: `textarea { line-height:20px; }`), because that style is also applied to the mirrored element.  It's only a problem when using a more specific selector (ie: `#content textarea{ line-height:20px; }`).  This style isn't applied to the mirrored textarea that Autosize creates, and it cannot copy the style from the original textarea because IE8 reports the wrong value.  As a workaround, Autosize adds a class to the mirrored element so that it can be targeted for styling.  Example:

````css
#content textarea, .autosizejs { line-height:20px; }
````

### Incorrect size in any IE:

For all browsers, the font-family for form elements are not inherited from their parent elements, unless the style is explicitly set to inherit.  When JavaScript is used to get the computed style for a textarea's font-family, all versions of IE will incorrectly return the inherited font-family if a font-family style was not explicitly set.  This can cause Autosize's calculations to be off.  The solution is to set a font-family for textarea elements in your stylesheet:

```css
/* set to a specific font-family */
textarea { font-family: Tahoma, sans-serif; }

/* or explicitly inherit */
textarea { font-family: inherit; }
```

### About CSS transitions

You may want to use a CSS transition on the height of a textarea, but not want to show the transition when autosize is first applied.  For example, if you had a textarea that was already pre-filled with text and you wanted to show a non-transitioned autosize on page load.  The easiest solution would to add the class associated with the transition *after* autosize has been assigned:

```
var $ta = $('textarea');

$ta.autosize();
document.body.offsetWidth; // trigger a reflow before the class is changed
$ta.addClass('textarea-transition');
```

<script src='/js/jquery.js'></script>
<script src='/js/jquery.autosize.js'></script>

<script>
	if ($ && $.fn.autosize) {
		$('#ta1').autosize();
		$('#ta2').autosize({append: "\n"});
	}
</script>
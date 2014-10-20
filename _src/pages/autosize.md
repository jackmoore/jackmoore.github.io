---
title: jQuery Autosize
template: post
description: A plugin to automatically adjust textarea height.
permalink: /autosize/
---

<a href="http://github.com/jackmoore/autosize/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<textarea id='ta2' placeholder='Autosize with a CSS transition. Try typing something...'></textarea>
<textarea id='ta1' placeholder='Autosize with no animation.'></textarea>

<h2><a href='https://github.com/jackmoore/autosize/archive/master.zip' style='text-decoration: underline;'>Download</a></h2>

Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>.  Source on <a href='http://github.com/jackmoore/autosize'>Github</a> (<a href='http://github.com/jackmoore/autosize#changelog'>changelog</a>).<br>
Compatible with: jQuery 1.7+ in Chrome, Firefox 4+, Safari 5+, Internet Explorer 6+, Opera 11+.<br>
Bower Package: `jquery-autosize`

<p>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=autosize&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=autosize&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe></p>

## Usage

```javascript
// Example:
$(document).ready(function(){
	$('textarea').autosize();	
});
```

Drop Autosize into any existing website and it should <em>Just Work</em>&trade;. <a href='https://raw.github.com/jackmoore/autosize/master/jquery.autosize.js'>The source</a> is short and well commented if you are curious to how it works.

## Manual Triggering

Autosize has no way of knowing when the value of a textarea has been changed through JavaScript.  If you do this, trigger the `autosize.resize` event immediately after to update the height.  Example:

```javascript	
$('#example').val('New Text!').trigger('autosize.resize');
```

The `autosize.resize` event only accounts for changes in value.  If you changed any of the typographic styles (font-size, line-height, etc), or the max-width, you can call `autosize.resizeIncludeStyle` and the textarea will resize with those styles accounted for:

```javascript
$('#example').css({font-size: '20px'}).trigger('autosize.resizeIncludeStyle');
```

## Removing Autosize

Trigger the `autosize.destroy` event to remove autosize from a textarea element:

```javascript	
$('#example').trigger('autosize.destroy');
```

## Settings

<table>
	<tr>
		<th>Property
		<th>Default
		<th>Description
	<tr>
		<td>className
		<td>'autosizejs'
		<td>The class name for the mirrored element, in case it's necessary to explicitly set a style on the mirrored element (see the note about line-height below).
	<tr>
		<td>id
		<td>'autosizejs'
		<td>The id of the hidden mirrored element, in case you prefer to access it by id.
	<tr>
		<td>callback
		<td>false
		<td>A function to call when the textarea is resized.
	<tr>
		<td>append
		<td>"\n"
		<td>By default, an extra newline is appended at the end of the text used in the height calculation.  This smooths out the height adjustment when animating.  This also avoids an issue with IE10+ briefly causing text to shift immediately before the height is increased.  You can set this property to `false` or other falsey value to remove the appended text.
	<tr>
		<td>placeholder
		<td>true
		<td>If the textarea is empty and has a placeholder value, autosize will use the length of the placeholder text to determine the height.  Set to false to ignore the placeholder value.
	<tr>
		<td>resizeDelay
		<td>10
		<td>Textareas with autosize assigned will have their height re-calculated when the window is resized. This property is the debounce delay in miliseconds to prevent the resize from triggering too frequently.  This can be set to false if the textarea has a static width that will not change during a window resize.
</table>

## Known Issues &amp; Solutions

<h3 id='faq-hidden-textarea'>Incorrect size with hidden textarea elements</h3>

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


<h3 id='faq-chrome-zoom'>Incorrect size when zoomed in Chrome</h3>

Autosize may not be big enough to fit all text in Chrome if it is zoomed in.  This should only happen when  the line-height for textarea elements is set to a numeric value (ie. `line-height: 1.4`) rather than a length or percent value (ie. `line-height: 1.4em` or `line-height: 140%`).  There is apparently an issue with the getComputedStyle value that Chrome calculates for numeric line-height values for textarea elements when zoomed. There isn't anything the plugin can do to correct this behavior, however the bug can be avoided in a couple of ways.

<strong>Possible ways to resolve:</strong>

* In your CSS, specify a non-number value for textarea line-height, such as `%`, `normal`, `em`, or `px`.

* If all textarea elements on your site share the same line-height value, then you can use a numeric line-height value if you include the `!important` modifier.  This will cause Autosize not to account for possible line-height variation when calculating the textarea size, which is impacted by the getComputedStyle bug.  For example:

```css
textarea {line-height: 1.4 !important;}
```


### Incorrect size in IE8:

Autosize adds a hidden textarea element to your document that mirrors the original textarea's input.  This mirrored textarea is used to calculate the size that the original textarea should be.  The mirrored textarea copies the original textarea's styles that relate to text formatting.

One copied style is `line-height`, and IE8 does not accurately report the line-height value for textarea elements. This is not an issue when the line-height is specified for the bare textarea selector (ie: `textarea { line-height:20px; }`), because that style is also applied to the mirrored element.  It's only a problem when using a more specific selector (ie: `#content textarea{ line-height:20px; }`).  This style isn't applied to the mirrored textarea that Autosize creates, and it cannot copy the style from the original textarea because IE8 reports the wrong value.  As a workaround, Autosize adds a class to the mirrored element so that it can be targeted for styling.  Example:

```css
#content textarea, .autosizejs { line-height:20px; }
```

### Incorrect size in any IE:

For all browsers, the font-family for form elements are not inherited from their parent elements, unless the style is explicitly set to inherit.  When JavaScript is used to get the computed style for a textarea's font-family, all versions of IE will incorrectly return the inherited font-family if a font-family style was not explicitly set.  This can cause Autosize's calculations to be off.  The solution is to set a font-family for textarea elements in your stylesheet:

```css
/* set to a specific font-family */
textarea { font-family: Tahoma, sans-serif; }

/* or explicitly inherit */
textarea { font-family: inherit; }
```

### About CSS transitions

You may want to use a CSS transition on the height of a textarea, but not want to show the transition when Autosize is first applied.  For example, if you had a textarea that was already pre-filled with text and you wanted to show a non-transitioned Autosize on page load.  The easiest solution would to add the class associated with the transition *after* Autosize has been assigned:

```javascript
var $ta = $('textarea');

$ta.autosize();
document.body.offsetWidth; // force a reflow before the class gets applied
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
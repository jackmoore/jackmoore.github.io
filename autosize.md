---
title: jQuery Autosize
layout: post
meta: A plugin to enable automatic height for textarea elements.
permalink: /autosize/
---

<a href="http://github.com/jackmoore/autosize/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<span>Try typing something...</span><br/>
<textarea id='ta1'>Autosize with no animation.  Try typing something...</textarea>
<textarea id='ta2'>Autosize with a CSS transition.</textarea>
<script src='/js/jquery.js'></script>
<script src='https://raw.github.com/jackmoore/autosize/master/jquery.autosize.js'></script>

## Download

<p><a href='https://github.com/jackmoore/autosize/archive/master.zip'>Current Version</a> ( Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a> | <a href='http://github.com/jackmoore/autosize/tree/master'>Github</a> | <a href='http://github.com/jackmoore/autosize#changelog'>Changelog</a> )</p>


Supported for: jQuery 1.4.3+ in Chrome, Firefox 4+, Safari 5+, Internet Explorer 6+, Opera 11+.

## Usage

````javascript
// Example:
$(document).ready(function(){
	$('textarea').autosize();	
});
````

Drop Autosize into any existing website and it should <em>Just Work</em>&trade;. <a href='https://raw.github.com/jackmoore/autosize/master/jquery.autosize.js'>The source</a> is short and well commented if you are curious to how it works. Email me if you run into any bugs.

## Manual Triggering
	
Autosize has no way of knowing when the value of a textarea has been changed through JavaScript.  If you do this, trigger the autosize event immediately after to update the height.  Example:

````javascript	
$('#example').val('New Text!').trigger('autosize');
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

### Note: line-height in IE8:

Autosize adds a hidden textarea element to your document that mirrors the original textarea's input.  This mirrored textarea is used to calculate the size that the original textarea should be.  The mirrored textarea copies the original textarea's styles that relate to text formatting.

One copied style is `line-height`, and IE8 does not accurately report the line-height value for textarea elements. This is not an issue when the line-height is specified for the bare textarea selector (ie: `textarea { line-height:20px; }`), because that style is also applied to the mirrored element.  It's only a problem when using a more specific selector (ie: `#content textarea{ line-height:20px; }`).  This style isn't applied to the mirrored textarea that Autosize creates, and it cannot copy the style from the original textarea because IE8 reports the wrong value.  As a workaround, Autosize adds a class to the mirrored element so that it can be targeted for styling.  Example:

````html
<style>
	#content textarea, .mirroredText { line-height:20px; }
</style>
<script>
	$(document).ready(function(){
		$('textarea').autosize({className:'mirroredText'});
	});
</script>
````

### Note: Hidden Textarea Elements

Autosize needs to be able to calculate the width of the textarea element it's been applied to.  JavaScript cannot calculate the width or height of elements that depend on the document flow if they have been removed from the document flow.  If you want to assign autosize to a hidden textarea element, be sure to either specify the pixel width of the element in your CSS, or trigger the autosize event after you reveal the textarea element.
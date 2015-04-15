---
title: Autosize
template: post
description: A small, stand-alone script to automatically adjust textarea height.
permalink: /autosize/
---

<a href="http://github.com/jackmoore/autosize/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<textarea id='autosize-example' placeholder='Try typing something...'></textarea>
<script src='/js/autosize.min.js'></script>
<script>
	autosize(document.getElementById('autosize-example'));
</script>

___

<p>Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>, source on <a href='http://github.com/jackmoore/autosize'>Github</a> (<a href='http://github.com/jackmoore/autosize/blob/master/changelog.md'>changelog</a>) &nbsp;<iframe style='vertical-align: middle' src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=autosize&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe> <iframe style='vertical-align: middle' src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=autosize&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe></p>

<a class='download' href='https://github.com/jackmoore/autosize/archive/master.zip'><i class='icon-download-alt'></i> Download</a>

##### Install via NPM
```bash
npm install autosize
```
##### Install via Bower
```bash
bower install autosize
```

#### Browser compatibility

Chrome | Firefox | IE | Safari | iOS Safari | Android | Opera Mini
------ | --------|----|--------|------------|---------|------------
yes    | yes     | 9  | yes    | yes        | 4       | ?

### Usage

The autosize function accepts a single textarea element, or an array or array-like object (such as a NodeList or jQuery collection) of textarea elements.

```javascript
// from a NodeList
autosize(document.querySelectorAll('textarea'));

// from a single Node
autosize(document.querySelector('textarea'));

// from a jQuery collection
autosize($('textarea'));
```

### Life-cycle Events

<table>
<tr>
<th>Event</th>
<th>Description</th>
</tr>
<tr>
<td>autosize:update</td>
<td>

Once you've assigned autosize to an element, you can manually trigger the resize event by using the 'autosize:update' event. Autosize has no way of knowing when a script has changed the value of a textarea element, or when the textarea element styles have changed, so this event would be used instruct autosize to resize the textarea.


```javascript
var ta = document.querySelector('textarea');

autosize(ta);

ta.value = "Some new value";

// Dispatch a 'autosize:update' event to trigger a resize:
var evt = document.createEvent('Event');
evt.initEvent('autosize:update', true, false);
ta.dispatchEvent(evt);
```
</td>
</tr>
<tr>
<td>autosize:destroy</td>
<td>

```javascript
var ta = document.querySelector('textarea');

// assign autosize to ta
autosize(ta);

// remove autosize from ta
var evt = document.createEvent('Event');
evt.initEvent('autosize:destroy', true, false);
ta.dispatchEvent(evt);
```
</td>
</tr>
<tr>
<td>autosize:resized</td>
<td>

This event is fired every time autosize adjusts the textarea height.

```javascript
var ta = document.querySelector('textarea');

ta.addEventListener('autosize:resized', function(){
	console.log('textarea height updated');
});
```

If you are using jQuery, you can use the on/off methods to listen to this event:

```javascript
$('textarea').each(function(){
	autosize(this);
}).on('autosize:resized', function(){
	console.log('textarea height updated');
});
```
</td>
</tr>
</table>


### Methods

These methods are provided as an alternative to using the life-cycle events.

<table>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
<tr>
<td>autosize.update(elements)</td>
<td>
For manually recalculating the height for a textarea element, array, or array-like object.

```javascript
var ta = document.querySelector('textarea');

autosize(ta);

ta.value = "Some new value";

autosize.update(ta);
```
</td>
</tr>
<tr>
<td>autosize.delete(elements)</td>
<td>
Removes autosize and reverts it's changes from a textarea element, array, or array-like object.

```javascript
autosize.delete(document.querySelectorAll('textarea'));
```
</td>
</tr>
</table>

## Trouble shooting

* [Setting a min-height or max-height](#faq-min-max)
* [Fixing slow or sluggish performance](#faq-slow)
* [Initial height is incorrect](#faq-hidden)


<h4 id='faq-min-max'>Setting a min-height or max-height</h4>

Use CSS to specify a min-height and max-height for the textarea element.  Once the height exceeds the max-height, autosize will re-enable the vertical scrollbar.

The rows attribute can also be used to specify a minimum height.  The rows attribute has a default value of `2`, so to make the textarea smaller than that you'll need to set the value to `1`.  Example: `<textarea rows='1'></textarea>`

<h4 id='faq-slow'>Fixing slow or sluggish performance</h4>

In Webkit, the default focus style for input and textarea elements includes `outline-style: auto`, which has a blurred drop-shadow like appearance.  Completely independent of autosize, Safari is terrible at animating anything with this blur on it.  My recommendation would be to use a non-blurred outline-style, and to remove any blurred box-shadow or other taxing CSS effect.  For example:

```css
input:focus, textarea:focus {
	outline-style: solid;
	outline-width: 2px;
}
```

<h4 id='faq-hidden'>Initial height is incorrect</h4>

Autosize needs to be able to calculate the width of the textarea element when it is assigned.  JavaScript cannot accurately calculate the width of an element that has been removed from the DOM or had it's display set to none.  If you want to assign Autosize to a hidden textarea element that you plan to reveal later, be sure to either specify the pixel width of the element in your CSS, or use the autosize.update method after you reveal the textarea element.

**Possible ways to resolve:**

* Specify an exact width for the textarea element in your stylesheet.
* Delay assigning autosize until the textarea has been revealed.  Alternatively, wait until the user focuses the textarea element:
	```javascript
	var ta = document.querySelector('textarea');
	ta.addEventListener('focus', function(){
		autosize(ta);
	});
	```

* Use the autosize.update method (or trigger the `autosize:update` event) after the element has been revealed.
	```javascript
	var ta = document.querySelector('textarea');
	ta.style.display = 'none';
	autosize(ta);
	ta.style.display = '';

	// Call the update method to recalculate the size:
	autosize.update(ta);
	```

### Differences between v2 and v1

If you need the v1 version for whatever reason, you can find it in the v1 branch on Github:
[https://github.com/jackmoore/autosize/tree/v1](https://github.com/jackmoore/autosize/tree/v1)

Autosize v2 is a smaller, simpler script than v1.  It is now a stand-alone script instead of a jQuery plugin, and support for IE8 and lower has been dropped (legacy IE users will be presented with an unmodified textarea element).  Additionally, Autosize v2 does not take in any optional parameters at this time.

Autosize v2 does not create a mirror textarea element in order to calculate the correct height, which was responsible for much of the original script's complexity.  This should be more efficient and reliable, but the new method prevents using a CSS transition to animate the height change.
---
title: Colorbox FAQ
template: post
permalink: /colorbox/faq/
---

<h2 id='faq-help'>Additional Help</h2>

If your problem isn't covered in this FAQ, your best bet would be to post your question to <a href='http://stackoverflow.com/questions/ask'>Stack Overflow</a>. Be sure to tag your question with `colorbox` and `jQuery`. Due to the volume of questions, I cannot offer individual support.

## Beginner's Guide

If you are completely new to jQuery plugins, try reading the Colorbox <a href='/colorbox/guide'>beginner's guide</a>

## Common Problems

* [YouTube link is not working](#faq-youtube)
* [The iframe is blank (X-Frame-Options error in console)](#faq-sameorigin)
* [Flash appears over Colorbox](#faq-flash)
* [Colorbox is positioned incorrectly or behaving strangely](#faq-doctype)
* [Colorbox is broken or looks incomplete while displaying documents.](#faq-iframe)
* [Colorbox only works the first time it is opened.](#faq-conflict)
* [Trying to load an external page results in "Request unsuccessful"](#faq-ajax)
* [JS Error: `$(selector).colorbox is not a function` or `$.colorbox is not a function`](#faq-jquery)
* [Closing Colorbox breaks accordians/tabs/animations](#faq-focus)
* [JavaScript/jQuery is not working inside of Colorbox](#faq-timing)
* [Colorbox is sized too small the first time ajax/inline content is opened](#faq-img)
* [Colorbox is not working with Microsoft SharePoint](#faq-sharepoint)
* [Inline forms not submitting / POSTing in ASP.NET](#faq-asp)

## How To

* [Open Colorbox on first visit (How to set a cookie)](#faq-cookie)
* [Pass Colorbox parameters based on a URL](#faq-querystring)
* [Disable scrolling on the main document while Colorbox is open](#faq-scrolling)
* [Prevent Colorbox from closing / Change the behavior of $.colorbox.close()](#faq-close)
* [Disable grouping by rel attribute](#faq-nofollow)
* [Close from iframe / Control from iframe](#faq-parent)
* [Create a separate link for opening a gallery](#faq-click)
* [Track Colorbox usage with Google Analytics](#faq-analytics)
* [Change Colorbox's default settings](#faq-defaults)
* [Make the title a link](#faq-titlelink)
* [Use Colorbox with a Flickr feed or JSON data](/notes/colorbox-with-json-or-flickr)

<h3 id='faq-youtube'>YouTube link is not working.</h3>

When you are showing a YouTube video in an iframe, you want to link to the embed version of the url.  Normally, your url would look something like this:

`http://www.youtube.com/watch?v=VOJyrQa_WR4`

To convert this to the embed version, we would replace `watch?v=` with `embed/`:

`http://www.youtube.com/embed/VOJyrQa_WR4`

If you wanted to use the normal url as the href value of your anchor elements, but use the embed version in Colorbox's iframe, you could do something like this:

```html
<a class='youtube' href='http://www.youtube.com/watch?v=VOJyrQa_WR4'>Business Cats</a>
<script>
	$('.youtube').colorbox({iframe: true, width: 640, height: 390, href:function(){
		var videoId = new RegExp('[\\?&]v=([^&#]*)').exec(this.href);
		if (videoId && videoId[1]) {
			return 'http://youtube.com/embed/'+videoId[1]+'?rel=0&wmode=transparent';
		}
	}});
</script>
```

I like to add the following parameters: `rel=0`, which tells YouTube not to show related videos when video ends, and `wmode=transparent`, which allows HTML elements to be displayed on top of the video if necessary. For more options, have a look at [YouTube's Player Parameters](https://developers.google.com/youtube/player_parameters).

<h3 id='faq-sameorigin'>The iframe is blank</h3>

Many sites, such as Google, simply cannot be displayed in an iframe.  These use a server setting (X-Frame-Options set to SAMEORIGIN) to prohibit their pages from being displayed in an iframe on a domain other than their own.

<h3 id='faq-flash'>Flash appears over Colorbox:</h3>

By default Flash will overlay any HTML content, including Colorbox.  This can be prevented by setting the 'wmode' param and embed attributes to 'transparent'.  See <a href='http://kb2.adobe.com/cps/155/tn_15523.html'>this post</a> from Adobe Support for more information.

<h3 id='faq-doctype'>Colorbox is positioned incorrectly or behaving strangely:</h3>

This is often due to loading colorbox.css after jquery.colorbox.js or stems from a bad doctype.  Both jQuery and colorbox.css need to be loaded prior to jquery.colorbox.js.  Colorbox should be called or assigned to elements inside of jQuery's ready method, which should be declared after jquery.colorbox.js.

Colorbox requires a valid doctype and rendering in quirks mode is not supported.  If you are not using the HTML5 doctype, make sure to include the full doctype declaration (with URI) to enable standards mode.

Unfortunately, this abbreviated doctype renders the document in quirks mode for Internet Explorer:

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

The doctype with URI renders in standards mode for all browsers:

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

For more information, see A List Apart's <a href='http://www.alistapart.com/articles/doctype/'>primer on doctypes</a> and QuirksMode on <a href='http://www.quirksmode.org/css/quirksmode.html'>quirks mode</a>.

<h3 id='faq-iframe'>Colorbox is broken or looks incomplete while displaying documents:</h3>

Often this is due to not using an iframe when an iframe would be required.  The default method, ajax, is only for elements that can exist within a `<body>` element.

If you are loading a complete HTML document with `<html>`, `<head>`, and `<body>` elements, then using an iframe is required.  While nesting these elements may appear to display correctly in some browsers, it is still invalid HTML and should not be depended on.   Remember to set the width and height values for Colorbox when using an iframe, it has no way of knowing the dimensions of elements that exist within the iframe.

Colorbox leverages jQuery's <a href='http://docs.jquery.com/Ajax/load'>.load()</a> method for handling ajax. If you are loading a document from the same domain as your current document, you can use a selector pull out just the portion of the document that is needed.

	$('#example').colorbox({href:'document.html div#content'});

<h3 id='faq-conflict'>Colorbox only works the first time it is opened:</h3>

This is often due to loading a document with script elements with Colorbox's ajax mode.  jQuery will automatically add script elements in ajax content to the document.  For example, if your ajax content had included its own copy of jQuery in a script tag, it would end up replacing your current version of jQuery that had been extended to include the Colorbox plugin.  Typically, you would use an iframe instead of ajax for content containing JavaScript or CSS that is not intended to be added to the main document.

<h3 id='faq-ajax'>Trying to load an external page results in "Request unsuccessful"</h3>

This could be due to an invalid URL or trying to load ajax content from a different domain.  Ajax will only work with documents that are on the same domain as your current document due to browser restrictions.  Ajax has to be run from a server to function (e.g., ajax content is not going to work from your desktop unless you are running a web server such as Apache for local development).

<h3 id='faq-jquery'>JS Error: `$(selector).colorbox is not a function` or `$.colorbox is not a function`</h3>

Double check your script paths and look for accidentally including multiple versions of jQuery.

This most often happens when users load multiple versions of jQuery which overwrites the version that was extended with the Colorbox plugin.  Check out source to see if a version of jQuery is being loaded after Colorbox has been loaded.

If your HTML document only contains one link to the jQuery library, the same error could also be caused by loading HTML snippets (through ajax) or HTML documents that load the jQuery library.  If you are loading HTML snippets with ajax or through Colorbox, be sure that they do not contain a link to the jQuery library. HTML documents should be contained within iframes or opened with Colorbox's iframe property.

<h3 id='faq-focus'>Closing Colorbox breaks accordians/tabs/animations</h3>

Try setting `returnFocus` to `false`.  Colorbox returns focus to the element it was launched from upon closing.  This is intended to provide better accessibility to users who use their keyboard to navigate through the document's links, but it can cause problems with some JS effects.  The problem isn't Colorbox specific and can be reproduced without Colorbox by pressing the TAB key to cycle through the available links.

<h3 id='faq-timing'>JavaScript/jQuery is not working inside of Colorbox.</h3>

This is often due to trying to access an element before it has been loaded into the document and can be resolved by moving the JavaScript into Colorbox's onComplete callback.

```javascript
// Example the jQuery Forms plugin: http://jquery.malsup.com/form/
$('#login_window').colorbox({onComplete:function(){
	$('form#login').ajaxForm();
}});
```

<h3 id='faq-img'>Colorbox is sized too small the first time ajax/inline content is opened</h3>

This is likely due to IMG elements in the loaded markup having not fully finished downloading before Colorbox measures the content to determine the width and height it should use.  The second time Colorbox is opened, the images have been cached and will take up the correct width and height within your document.  This can easily be fixed by adding the width and height dimensions to the IMG element (a recommended practice), or by setting a style that specifies the width and height of the image in your CSS.

<h3 id='faq-sharepoint'>Colorbox is not working with Microsoft SharePoint</h3>

The default master page used by SharePoint does not specify a doctype.  Colorbox requires the browser render in strict mode, which is enabled by specifying a valid doctype at the very beginning of your HTML document.  The master page will have to be edited so that it includes a doctype.

Also see the <a href='#faq-doctype'>doctype entry</a> in this FAQ

<h3 id='faq-asp'>Inline forms not submitting / POSTing in ASP.NET</h3>

This happens because the entire form isn't being loaded into Colorbox, just the form fields.  Since the form fields have been moved outside of their parent form element, the form is broken.  The proper solution would be to include the parent form element together with the form field elements so that the form stays intact.  However, this is impractical with ASP.NET forms as the entire content of the body element is wrapped with the form element.  To work around this, move Colorbox's markup so that it and content displayed in it will reside within the form element.  Example:

```javascript
$(document).ready(function () {
	$("#colorbox, #cboxOverlay").appendTo('form:first');
	$("#link_to_form").colorbox({
		width: "50%",
		inline: true,
		href: "#form_fields_container"
	});
});
```

<h3 id='faq-cookie'>Open Colorbox on first visit</h3>

You'll need to define a cookie that indicates that the user has already visited to site, then use that to determine whether or not to display Colorbox.

```javascript
// Display a welcome message on first visit, and set a cookie that expires in 30 days:
if (document.cookie.indexOf('visited=true') === -1) {
	var expires = new Date();
	expires.setDate(expires.getDate()+30);
	document.cookie = "visited=true; expires="+expires.toUTCString();
	$.colorbox({html:"Welcome!"});
}
```

<h3 id='faq-querystring'>Pass Colorbox parameters based on a URL</h3>

With a little JavaScript, you can parse the parameters from your URL's querystring and pass them to Colorbox.

```javascript
// example url: http://example.com/gallery.html?open=true&amp;height=500
function getParameters(){
	var
	settingsObject = {},
	hash,
	hashes =  location.search.substring(1).split(/&amp;/),
	i;
	
	for (i = 0; i &lt; hashes.length; i++) {
		hash = hashes[i].split('=');
		settingsObject[hash[0]] = hash[1];
	}
	return settingsObject;
}
var settings = $.extend({width:'100%', height:'100%', speed:0}, getParameters());
$('a.example').colorbox(settings);
```

Here we selected some elements in our document, assigned colorbox to them, then used jQuery's <a href='http://api.jquery.com/jQuery.extend/'><code>$.extend()</code></a> method to combine our querystring parameters with the initial settings we set for our elements.  This is just an example however, and you probably should not let visitors control all of Colorbox's parameters (through modifying the querystring).

<h3 id='faq-scrolling'>Disable scrolling on the main document while Colorbox is open</h3>

You can hide the overflow on your body element to disable the scrolling on the main document.

To disable scrolling on your main document, you can set the body elements overflow to hidden using Colorbox's public events or callbacks.

Here is how to use Colorbox's public events to disable scrolling anytime Colorbox is opened:

```javascript
$(document).on('cbox_open', function() {
    $('body').css({ overflow: 'hidden' });
}).on('cbox_closed', function() {
    $('body').css({ overflow: '' });
});​
```
Here is how to use Colorbox's callbacks to disable scrolling for a specific selector:

```javascript
$('a.example').colorbox({
	onOpen: function(){
	  $('body').css({ overflow: 'hidden' });
	},
	onClosed: function(){
	   $('body').css({ overflow: '' });
	}
});
```

<h3 id='faq-close'>Prevent Colorbox from closing / Change the behavior of $.colorbox.close</h3>

Colorbox's close method can be cached and redefined as to control what happens when Colorbox is closed.  This affects controls that are bind to it (such as the escKey, overlayClose, and the close button) and calling the close method directly.
For example, let's open Colorbox to display a form element and redefine the close method to warn the visitor that they will discard their input if they try to close Colorbox before they submit their data.

```javascript
var originalClose = $.colorbox.close;
$.colorbox.close = function(){
	var response;
	if($('#cboxLoadedContent').find('form').length > 0){
		response = confirm('Do you want to close this window?');
		if(!response){
			return; // Do nothing.
		}
	}
	originalClose();
};
$('a#example').colorbox();
```

<h3 id='faq-nofollow'>Disable grouping by rel attribute</h3>

Set Colorbox's `rel` property to `'nofollow'`.

```javascript
$('a[rel="examples"]').colorbox({rel:'nofollow'});
```

<h3 id='faq-parent'>Close from iframe / Control from iframe</h3>

An iframe can access its parent document's window object via `window.parent`.  This gives you access to variables that exist within the parent document's global scope, such as jQuery.

```html
<!-- calling close method from within an iframe: -->
<a href='#' onclick='window.parent.jQuery.colorbox.close(); return false;'>
	close this iframe
</a>

<!-- open Colorbox in the parent from an iframed -->
<a href='#' onclick='window.parent.jQuery.colorbox({href:"login.php"}); return false;'>
	open in parent window
</a>
```

<h3 id='faq-click'>Create a separate link for opening a gallery</h3>

Lets say you've assigned Colorbox to a set of links in your document, but you also want to have an "Open Gallery" link that opens the first item in your set.  When "Open Gallery" is clicked, you want to prevent the default action, then trigger a click event on that first set item.

```javascript
var $gallery = $("a[rel=gallery]").colorbox();
$("a#openGallery").click(function(e){
	e.preventDefault();
	$gallery.eq(0).click();
});
```

<h3 id='faq-analytics'>Track Colorbox usage with Google Analytics</h3>

This can be done by calling the tracker and passing it the URL you want to log once Colorbox has displayed the content.  Either use Colorbox's 'onComplete' callback or bind to the 'cbox_complete' event.  The tracking method depends on whether you are using Google's <a href='http://code.google.com/apis/analytics/docs/tracking/gaTrackingOverview.html'>traditional tracker</a> or the newer <a href='http://code.google.com/apis/analytics/docs/tracking/asyncUsageGuide.html'>asynchronous tracker</a>.  Examples:

```javascript
// async tracker
$(document).bind("cbox_complete", function(){
	var href = $.colorbox.element().attr("href");
	if (href) {
		_gaq.push(["_trackPageview", href]);
	}
});

// traditional tracker
$(document).bind("cbox_complete", function(){
	var href = $.colorbox.element().attr("href");
	if (href) {
		pageTracker._trackPageview(href);
	}
});
```

<h3 id='faq-defaults'>Change Colorbox's default settings</h3>

The default settings can be changed by accessing the settings object and assigning it new values.  The new values must be set before Colorbox is assigned to any elements in your markup, otherwise they will not be applied.

```javascript
// change defaults individually:
$.colorbox.settings.opacity = 0.5;
$.colorbox.settings.speed = 0;
$.colorbox.settings.close = 'Exit';

// or use jQuery's $.extend() to change many defaults at once:
$.extend($.colorbox.settings, {opacity:0.5, speed:0, close:'Exit'});
```

<h3 id='faq-titlelink'>Make the title a link</h3>

Colorbox can be passed a function to be evaluated in place of a static value for any of its properties.  Through that any sort of string formatting or markup building can be done and displayed as the title:

```javascript
$('a.gallery').colorbox({title:function () {
	return "To view full size, " + "click here!".link(this.href);
}});
```
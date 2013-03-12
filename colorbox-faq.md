---
title: ColorBox FAQ
layout: post
permalink: /colorbox/faq/
---

<h2 id='faq-help'>Additional Help</h2>

If your problem isn't covered in this FAQ, your best bet would be to post your question to <a href='http://stackoverflow.com/questions/ask'>Stack Overflow</a>. Be sure to tag your question with `colorbox` and `jQuery`. Due to the volume of questions, I cannot offer individual support.

## Beginner's Guide

If you are completely new to jQuery plugins, try reading the ColorBox <a href='/colorbox/guide'>beginner's guide</a>

## Common Problems

* [Flash appears over ColorBox](#faq-flash)
* [ColorBox is positioned incorrectly or behaving strangely](#faq-doctype)
* [ColorBox is broken or looks incomplete while displaying documents.](#faq-iframe)
* [ColorBox only works the first time it is opened.](#faq-conflict)
* [Trying to load an external page results in "Request unsuccessful"](#faq-ajax)
* [JS Error: `$(selector).colorbox is not a function` or `$.colorbox is not a function`](#faq-jquery)
* [Closing ColorBox breaks accordians/tabs/animations](#faq-focus)
* [JavaScript/jQuery is not working inside of ColorBox](#faq-timing)
* [ColorBox is sized too small the first time ajax/inline content is opened](#faq-img)
* [IE6/IE7 freezes with jQuery 1.6.0](#faq-jquerybug)
* [ColorBox is not working with Microsoft SharePoint](#faq-sharepoint)
* [Inline forms not submitting / POSTing in ASP.NET](#faq-asp)

## How To

* [Open ColorBox on first visit (How to set a cookie)](#faq-cookie)
* [Pass ColorBox parameters based on a URL](#faq-querystring)
* [Prevent ColorBox from closing / Change the behavior of $.colorbox.close()](#faq-close)
* [Disable grouping by rel attribute](#faq-nofollow)
* [Control ColorBox from within an iframe](#faq-parent)
* [Create a separate link for opening a gallery](#faq-click)
* [Track ColorBox usage with Google Analytics](#faq-analytics)
* [Change ColorBox's default settings](#faq-defaults)
* [Make the title a link](#faq-titlelink)
* [Use ColorBox with a Flickr feed or JSON data](/notes/colorbox-with-json-or-flickr)

<h3 id='faq-flash'>Flash appears over ColorBox:</h3>

By default Flash will overlay any HTML content, including ColorBox.  This can be prevented by setting the 'wmode' param and embed attributes to 'transparent'.  See <a href='http://kb2.adobe.com/cps/155/tn_15523.html'>this post</a> from Adobe Support for more information.

<h3 id='faq-doctype'>ColorBox is positioned incorrectly or behaving strangely:</h3>

This is often due to loading colorbox.css after jquery.colorbox.js or stems from a bad doctype.  Both jQuery and colorbox.css need to be loaded prior to jquery.colorbox.js.  ColorBox should be called or assigned to elements inside of jQuery's ready method, which should be declared after jquery.colorbox.js.

ColorBox requires a valid doctype and rendering in quirks mode is not supported.  If you are not using the HTML5 doctype, make sure to include the full doctype declaration (with URI) to enable standards mode.

Unfortunately, this abbreviated doctype renders the document in quirks mode for Internet Explorer:

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

The doctype with URI renders in standards mode for all browsers:

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

For more information, see A List Apart's <a href='http://www.alistapart.com/articles/doctype/'>primer on doctypes</a> and QuirksMode on <a href='http://www.quirksmode.org/css/quirksmode.html'>quirks mode</a>.

<h3 id='faq-iframe'>ColorBox is broken or looks incomplete while displaying documents:</h3>

Often this is due to not using an iframe when an iframe would be required.  The default method, ajax, is only for elements that can exist within a `<body>` element.

If you are loading a complete HTML document with `<html>`, `<head>`, and `<body>` elements, then using an iframe is required.  While nesting these elements may appear to display correctly in some browsers, it is still invalid HTML and should not be depended on.   Remember to set the width and height values for ColorBox when using an iframe, it has no way of knowing the dimensions of elements that exist within the iframe.

ColorBox leverages jQuery's <a href='http://docs.jquery.com/Ajax/load'>.load()</a> method for handling ajax. If you are loading a document from the same domain as your current document, you can use a selector pull out just the portion of the document that is needed.

	$('#example').colorbox({href:'document.html div#content'});

<h3 id='faq-conflict'>ColorBox only works the first time it is opened:</h3>

This is often due to loading a document with script elements with ColorBox's ajax mode instead of using an iframe.  And iframe would prevent those scripts from interfering with the scripts in the host document.  Often it's due to the parent document's version of jQuery being overwritten  by the loaded in document's version of jQuery.

<h3 id='faq-ajax'>Trying to load an external page results in "Request unsuccessful"</h3>

This could be due to an invalid URL or trying to load ajax content from a different domain.  Ajax will only work with documents that are on the same domain as your current document due to browser restrictions.  Ajax has to be run from a server to function (e.g., ajax content is not going to work from your desktop unless you are running a web server such as Apache for local development).

<h3 id='faq-jquery'>JS Error: `$(selector).colorbox is not a function` or `$.colorbox is not a function`</h3>

Double check your script paths and look for accidentally including multiple versions of jQuery.

This most often happens when users load multiple versions of jQuery which overwrites the version that was extended with the ColorBox plugin.  Check out source to see if a version of jQuery is being loaded after ColorBox has been loaded.

If your HTML document only contains one link to the jQuery library, the same error could also be caused by loading HTML snippets (through ajax) or HTML documents that load the jQuery library.  If you are loading HTML snippets with ajax or through ColorBox, be sure that they do not contain a link to the jQuery library. HTML documents should be contained within iframes or opened with ColorBox's iframe property.

<h3 id='faq-focus'>Closing ColorBox breaks accordians/tabs/animations</h3>

Try setting `returnFocus` to `false`.  ColorBox returns focus to the element it was launched from upon closing.  This is intended to provide better accessibility to users who use their keyboard to navigate through the document's links, but it can cause problems with some JS effects.  The problem isn't ColorBox specific and can be reproduced without ColorBox by pressing the TAB key to cycle through the available links.

<h3 id='faq-timing'>JavaScript/jQuery is not working inside of ColorBox.</h3>

This is often due to trying to access an element before it has been loaded into the document and can be resolved by moving the JavaScript into ColorBox's onComplete callback.

	// Example the jQuery Forms plugin: http://jquery.malsup.com/form/
	$('#login_window').colorbox({onComplete:function(){
		$('form#login').ajaxForm();
	}});

<h3 id='faq-img'>ColorBox is sized too small the first time ajax/inline content is opened</h3>

This is likely due to IMG elements in the loaded markup having not fully finished downloading before ColorBox measures the content to determine the width and height it should use.  The second time ColorBox is opened, the images have been cached and will take up the correct width and height within your document.  This can easily be fixed by adding the width and height dimensions to the IMG element (a recommended practice), or by setting a style that specifies the width and height of the image in your CSS.

<h3 id='faq-jquerybug'>IE6/IE7 freezes with jQuery 1.6.0</h3>

jQuery 1.6.0 had a <a href='http://bugs.jquery.com/ticket/9072'>regressive bug</a> that affects ColorBox.  Either use jQuery 1.6.1 or higher.

<h3 id='faq-sharepoint'>ColorBox is not working with Microsoft SharePoint</h3>

The default master page used by SharePoint does not specify a doctype.  ColorBox requires the browser render in strict mode, which is enabled by specifying a valid doctype at the very beginning of your HTML document.  The master page will have to be edited so that it includes a doctype.

Also see the <a href='#faq-doctype'>doctype entry</a> in this FAQ

<h3 id='faq-asp'>Inline forms not submitting / POSTing in ASP.NET</h3>

This happens because the entire form isn't being loaded into ColorBox, just the form fields.  Since the form fields have been moved outside of their parent form element, the form is broken.  The proper solution would be to include the parent form element together with the form field elements so that the form stays intact.  However, this is impractical with ASP.NET forms as the entire content of the body element is wrapped with the form element.  To work around this, move ColorBox's markup so that it and content displayed in it will reside within the form element.  Example:

	$(document).ready(function () {
		$("#colorbox, #cboxOverlay").appendTo('form:first');
		$("#link_to_form").colorbox({ width: "50%", inline: true, href: "#form_fields_container" });
	});

<h3 id='faq-cookie'>Open ColorBox on first visit</h3>

You'll need to define a cookie that indicates that the user has already visited to site, then use that to determine whether or not to display ColorBox.

	// Display a welcome message on first visit, and set a cookie that expires in 30 days:
	if (document.cookie.indexOf('visited=true') === -1) {
		var expires = new Date();
		expires.setDate(expires.getDate()+30);
		document.cookie = "visited=true; expires="+expires.toUTCString();
		$.colorbox({html:"Welcome!"});
	}

<h3 id='faq-querystring'>Pass ColorBox parameters based on a URL</h3>

With a little JavaScript, you can parse the parameters from your URL's querystring and pass them to ColorBox.

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
	$('a.example').colorbox($.extend({width:'100%', height:'100%', speed:0}, getParameters()));

Here we selected some elements in our document, assigned colorbox to them, then used jQuery's <a href='http://api.jquery.com/jQuery.extend/'><code>$.extend()</code></a> method to combine our querystring parameters with the initial settings we set for our elements.  This is just an example however, and you probably should not let visitors control all of ColorBox's parameters (through modifying the querystring).

<h3 id='faq-close'>Prevent ColorBox from closing / Change the behavior of $.colorbox.close</h3>

ColorBox's close method can be cached and redefined as to control what happens when ColorBox is closed.  This affects controls that are bind to it (such as the escKey, overlayClose, and the close button) and calling the close method directly.
For example, let's open ColorBox to display a form element and redefine the close method to warn the visitor that they will discard their input if they try to close ColorBox before they submit their data.

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

<h3 id='faq-nofollow'>Disable grouping by rel attribute</h3>

Set ColorBox's `rel` property to `'nofollow'`.

	$('a[rel="examples"]').colorbox({rel:'nofollow'});

<h3 id='faq-parent'>Control ColorBox from within an iframe</h3>

An iframed document's `window` object will have a `parent` property that is used to get the parent's window object.  The parent window's scripts (jQuery/ColorBox) can be accessed through that parent property:

	<!-- calling colorbox's close method from within an iframe: -->
	<a href='#' onclick='parent.$.colorbox.close(); return false;'>close this iframe</a>

	<!-- open colorbox in the parent of an iframed document -->
	<a onclick='parent.$.colorbox({href:"login.php"}); return false;'>open in parent window</a>

<h3 id='faq-click'>Create a separate link for opening a gallery</h3>

Lets say you've assigned ColorBox to a set of links in your document, but you also want to have an "Open Gallery" link that opens the first item in your set.  When "Open Gallery" is clicked, you want to prevent the default action, then trigger a click event on that first set item.

	var $gallery = $("a[rel=gallery]").colorbox();
	$("a#openGallery").click(function(e){
		e.preventDefault();
		$gallery.eq(0).click();
	});

<h3 id='faq-analytics'>Track ColorBox usage with Google Analytics</h3>

This can be done by calling the tracker and passing it the URL you want to log once ColorBox has displayed the content.  Either use ColorBox's 'onComplete' callback or bind to the 'cbox_complete' event.  The tracking method depends on whether you are using Google's <a href='http://code.google.com/apis/analytics/docs/tracking/gaTrackingOverview.html'>traditional tracker</a> or the newer <a href='http://code.google.com/apis/analytics/docs/tracking/asyncUsageGuide.html'>asynchronous tracker</a>.  Examples:

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

<h3 id='faq-defaults'>Change ColorBox's default settings</h3>

The default settings can be changed by accessing the settings object and assigning it new values.  The new values must be set before ColorBox is assigned to any elements in your markup, otherwise they will not be applied.

	// change defaults individually:
	$.colorbox.settings.opacity = 0.5;
	$.colorbox.settings.speed = 0;
	$.colorbox.settings.close = 'Exit';

	// or use jQuery's $.extend() to change many defaults at once:
	$.extend($.colorbox.settings, {opacity:0.5, speed:0, close:'Exit'});

<h3 id='faq-titlelink'>Make the title a link</h3>

ColorBox can be passed a function to be evaluated in place of a static value for any of it's properties.  Through that any sort of string formatting or markup building can be done and displayed as the title:

	$('a.gallery').colorbox({title:function () {
		return "To view full size, " + "click here!".link(this.href);
	}});
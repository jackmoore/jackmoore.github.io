---
title: Solving IE7 &amp; IE8 PNG Opacity Problems
description: How to fix transparent png issues associated with Internet Explorer's alpha filter.
tags: [Internet Explorer, CSS]
---

## PNG Alpha-transparencies

	/* Normal CSS background using an PNG with an alpha transparency */
	#demo {
		background:url(ie8-logo.png) 0 0 no-repeat;
	}

IE7 and IE8 have native PNG support for alpha-transparencies, but it falls to pieces as soon as opacity comes into the picture.  When setting any value for opacity, even 100% (ie. `filter: alpha(opacity = 100)`), IE fills in the alpha-transparency of the PNG with a pure black fill.  This is sometimes refered to as a 'black halo'.  The alpha filter can be removed at any time to remove the fill and restore the alpha transparency, but supporting both requires using more of IE's propriatary filters.  All of the follow examples should be placed in a IE-targeted [conditional comment](http://www.quirksmode.org/css/condcom.html).

### Screenshot

![](/img/alpha-demo.png)

### Gradient filter fix

This is a great little hack that avoids the drawbacks associated with using AlphaImageLoader.  The caveat is that it does not work for IE6, and the PNG may need to be tweaked a bit for it to display correctly.

	#demo {
		background:url(ie8-logo.png) 0 0 no-repeat;
		filter: progid:DXImageTransform.Microsoft.gradient(
			startColorstr=#00FFFFFF, endColorstr=#00FFFFFF
		);
	}


Colorbox uses this technique for alpha channel support in IE8 and IE7.  Credit for this technique goes to [Dan Tello](http://www.sitepoint.com/forums/javascript-15/jquery-fadein-fadeout-transparent-png-ie7-chrome-590295.html), and to [Lukom](https://github.com/Lukom) for bringing it to my attention.

### AlphaImageLoader filter fix

	#demo {
		background: transparent;
		filter:
		progid:DXImageTransform.Microsoft.AlphaImageLoader(src=ie8-logo.png,sizingMethod='crop');
	}

This is a less robust solution than the gradient filter, however it works well and is supported for IE6-IE8.  The AlphaImageLoader filter displays an image between the background and the content.

**It is treated like an image element and not a CSS background-image, so it loses CSS properties like background-position and background-repeat.  Also, its src is relative to the current HTML document unlike a CSS background-image which path is relative to the CSS document.**  An absolute path or path that is relative to the root can be used to avoid some of the document to document path confusion.  A CSS expression can be used to create a path that is relative to the CSS document as having paths relative to the HTML document can impractical, especially for code that is distributed or reuable.

	#demo {
		background:url(ie8-logo.png) 0 0 no-repeat;
		behavior:
		expression(this.src = this.src ?
			this.src : this.currentStyle.backgroundImage.split('"')[1],
			this.style.background = "none",
		this.style.filter =
			"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="
			+ this.src + ",sizingMethod='crop')");
	}

This is how Colorbox enables PNG alpha-transparency support in IE6.  Using CSS expressions are not supported in IE8 and their use is discouraged in general, but IE6 users have limited options here.

## ClearType Issues

IE7 & IE8 lose ClearType whenever there an opacity filter is applied (ie. `filter: alpha(opacity=50)`).  It even happens when the opacity is set to 100%.  There are a couple of things that can be done to improve the situation. 1. Use a background fill if possible.  2. Remove the filter in situations where it would be at 100%.  For example, if you animated an element from having 0 opacity to having 100% opacity.

![](/img/cleartype.png)

## Opacity Inheritance

IE7, IE8, and IE9 all have some sort of defective [opacity inheritance](/notes/ie-opacity-inheritance).
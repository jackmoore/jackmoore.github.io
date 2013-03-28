---
title: Colorbox Beginner's Guide
meta: A tutorial for first-time jQuery users.
layout: post
permalink: /colorbox/guide/
---

Users familiar with jQuery will be better served viewing source on the <a href='/colorbox/example1/'>demo page</a> and using that as a guide.

Colorbox is a [jQuery](http://jquery.com) plugin, meaning that it extends the jQuery JavaScript library to include extra functionality.  In your HTML document, you must include the jQuery library's source before you include the source of any jQuery plugin.  Colorbox has the additional requirement that you include its stylesheet in the `<head>` of your document before you include the source of the plugin.

Here is an example HTML5 document with the required files:

	<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="colorbox.css" />
			<script src="jquery.min.js"></script>
			<script src="jquery.colorbox-min.js"></script>
		</head>
		<body>
			<a class='gallery' href='image1.jpg'>Photo_1</a>
			<a class='gallery' href='image2.jpg'>Photo_2</a>
			<a class='gallery' href='image3.jpg'>Photo_3</a>
		</body>
	</html>

Let's use Colorbox to display the links that have a class of 'gallery'.  We will use jQuery to query the DOM to find the matching links, then apply the colorbox method to them:

	<script>
		jQuery('a.gallery').colorbox();
	</script>

Here, the [`jQuery()`](http://api.jquery.com/jQuery/) function takes in the `a.gallery` [CSS selector](http://api.jquery.com/category/selectors/) and queries the DOM for matching elements.  It returns a collection of elements, which we then apply colorbox to by calling jQuery's `.colorbox()` method.

A browser parses your HTML document from top to bottom.  When a browser encounters a `<script>` block, it will stop parsing your HTML document and execute the script.  The browser will resume parsing your document once the script has executed. This means if you use a `<script>` in the `<head>` of your document to assign Colorbox to links in your document, the script will be executed before the markup of those links have been parsed and added to the DOM.  Those links must be in the DOM before colorbox can be assigned to them.  Inserting the `<script>` after the markup for the links insures that the links will be in the DOM when we query for them:

	<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="colorbox.css" />
			<script src="jquery.min.js"></script>
			<script src="jquery.colorbox-min.js"></script>
		</head>
		<body>
			<a class='gallery' href='image1.jpg'>Photo_1</a>
			<a class='gallery' href='image2.jpg'>Photo_2</a>
			<a class='gallery' href='image3.jpg'>Photo_3</a>
			<script>
				jQuery('a.gallery').colorbox();
			</script>
		</body>
	</html>

An alternative to placing this `<script>` at the bottom of the document would be to use jQuery's [`.ready()` method](http://api.jquery.com/ready/).  This method takes in a callback function that will be executed once the DOM has finished loading.

Lastly, the `.colorbox()` method accepts an optional settings object that overwrites the default settings that control colorbox's behavior. The settings object is made up of a comma-separated list of name:value pairs in between an opening and closing curly bracket.  Example:

	{ opacity:0.5 , rel:'group1' }

Here is the `.ready()` method and Colorbox settings object applied to our example document:

	<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="colorbox.css" />
			<script src="jquery.min.js"></script>
			<script src="jquery.colorbox-min.js"></script>
			<script>
				jQuery(document).ready(function () {
					jQuery('a.gallery').colorbox({ opacity:0.5 , rel:'group1' });
				});
			</script>
		</head>
		<body>
			<a class='gallery' href='image1.jpg'>Photo_1</a>
			<a class='gallery' href='image2.jpg'>Photo_2</a>
			<a class='gallery' href='image3.jpg'>Photo_3</a>
		</body>
	</html>

If you have questions, [go here](/colorbox/faq/#faq-help). A [complete list of the settings](/colorbox/) available are documented on the Colorbox page.
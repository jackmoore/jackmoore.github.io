---
title: Colorbox with Flickr Feed
layout: post
meta: Here we'll use jQuery and Flickr to build a thumbnail gallery that will display full-size photos in Colorbox.
tags: [Colorbox, jQuery]
---

### Step 1: Include jQuery and Colorbox

Feel free to jump straight to <a href='/demo/flickr.html'>the demo</a> to view-source. We will be building off of this basic HTML5 document:

	<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="colorbox.css">
			<script src="jquery.min.js"></script>
			<script src="jquery.colorbox-min.js"></script>
			<script>
				// our code
			</script>
		</head>
		<body>
		</body>
	</html>

### Step 2: Get Flickr's JSON data

The first thing we will want to do is use jQuery to fetch the JSON object from Flickr's public feed.  We will use the data in that JSON object to create the markup for our gallery. The data set returned by the feed can be <a href='http://www.flickr.com/services/feeds/docs/photos_public/'>filtered by tags and can include multiple users</a>.  Properties for these can be added to the `params` object below, but this demo will just be using the default settings.

	var params = {
		id: '68459092@N06', // my Flickr User ID
		format: 'json',
		jsoncallback: '?'
	},
	feedURL = 'http://api.flickr.com/services/feeds/photos_public.gne',
	feedQuery = decodeURIComponent($.param(params));

	$.getJSON(feedURL + '?' + feedQuery, buildLinks);

I recommend taking a moment to view the <a href='http://api.flickr.com/services/feeds/photos_public.gne?id=68459092@N06&amp;format=json&amp;jsoncallback=?' target='_blank'>raw JSON data</a>.  The `items` property contains an array of objects that contain all of the data needed to create the links and thumbnails.  The URL to the photo is found in the `media` object.  This URL is formatted to give the 'small' size of the photo.  We will have to alter this URL to give us a larger size to display in Colorbox and again to give us a smaller size to use for a thumbnail.  Fortunately we just have to exchange the [size suffix](http://www.flickr.com/services/api/misc.urls.html) with the suffix for the size we want.

### Step 3: Build the Links

Let's create the anchor elements, assign Colorbox to them, and add them to our document:

	function buildLinks (json) {
		var 
		photo,
		$links = $(), 
		$thumb,
		$anchor;

		while ( photo = json.items.pop() ){
			$anchor = $('<a>').attr({
				// get the medium-large size photo
				href: photo.media.m.replace('_m', '_z'),
				title: photo.title
			});

			$thumb = $('<img>').attr({
				// get the small-square size thumbnail photo
				src: photo.media.m.replace('_m', '_s'),
				alt: photo.title
			}).appendTo($anchor);

			$links = $links.add($anchor);
		}

		$links.colorbox({rel:'flickr', speed:0});

		// Wait until the DOM has loaded before trying to append to the body
		$(document).ready(function () {
			$('body').append($links);
		});
	}

[View the demo](/demo/flickr.html) and see it all put together.

### Notes

* I'm aware this code isn't the most efficient or robust, but hopefully it made for a clear demo.
* Currently our thumbnails are in descending order by date.  To list the thumbnails in ascending order, replace `json.items.pop()` with `json.items.shift()`.
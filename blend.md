---
title: jQuery Blend
layout: default
meta: A plugin to cross-fade CSS backgrounds.
permalink: /blend/
---

<a href="http://github.com/jackmoore/blend/tree/master" id='fork'>Fork me on GitHub</a>

<div class='alert'><strong>Notice: This page has been retired!</strong> I recommend using a CSS transition instead of this plugin.  However, feel free to view the source to learn how to setup your CSS and HTML.</div>

## Demo

<iframe style='height:150px;' class='demo' frameborder=0 scrolling="no" src='/blend/demo.html'></iframe>

## Download

Current version: <a href='https://github.com/jackmoore/blend/archive/master.zip'>2.4</a> ( Released under the <a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a> | <a href='http://github.com/jackmoore/blend/tree/master'>Github</a> | <a href='http://github.com/jackmoore/blend#changelog'>Changelog</a> )
<br/>Tested in: Firefox 3 &amp; 4, Safari 4 &amp; 5, Opera, Chrome, Internet Explorer 7, 8, 9.

## About

This is an effect I found myself coding repeatedly for sites, so I decided to turn it into a plugin that could be quickly implimented.  It works by creating a layer in your HTML element that sits between the content and the background, which is faded out on mouse-over events.

## Instructions

In addition to your regular CSS `:hover` style, a class of `hover` must be added for targeted elements.  This is needed because there is no way for JavaScript to read the CSS `:hover` styles.  However, JavaScript can add a class to an element and then read the style off that element.

	// Normal CSS :hover style:
	#navHome:hover{background:#f00}

	// Same CSS with hover class:
	#navHome:hover, #navHome.hover{background:#f00}

## Usage

	// Format:
	$(selector).blend(speed, callback);");

	// Examples:
	$('a#nav1').blend();
	$('a#nav2').blend(600);
	$('a#nav3').blend(300, function(){ alert('hello'); });
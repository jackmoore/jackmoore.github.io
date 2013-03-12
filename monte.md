---
title: jQuery Monte
layout: project
meta: A carousel plugin for images and/or HTML.
permalink: /monte/
---

<a href="http://github.com/jackmoore/monte/tree/master" id='fork'>Fork me on GitHub</a>

## Demo

<iframe style='height:380px; width:100%; min-width:850px;' frameborder=0 scrolling="no" src='/monte/demo.html'>Demo</iframe>

[More demos &raquo;](/monte/demo.html)

## Download

<p>Current version: <a href='https://github.com/jackmoore/monte/archive/master.zip'>1.0</a> ( Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a> | <a href='http://github.com/jackmoore/monte/tree/master'>Github</a> )</p>

Tested in: Chrome, Firefox, Safari, Internet Explorer 6, 7, 8, 9, Opera 11.

## Usage
	// Format:
	var player = $.monte(selector, settings);

	// Examples
	// Using the default settings:
	$.monte('#container');

	// Turning off auto-play and increase the animation-speed:
	$.monte('#container', { auto: false, speed: 200 });

Monte requires a selector for the parent object of the slide elements, and takes in an optional settings object.

Things to know:

* All slides are set to the same width and height as the first slide.
* A minimum of 3 elements to use as slides are required.
* The left slide will be aligned to the left side of the parent, and the right slide will be aligned to the right side of the parent.
* Monte will turn every child element of the parent into a slide.  This can be any mix of HTML and/or IMG elements.

## Settings

<table>
	<tr>
		<th>Property</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>height</td>
		<td>false</td>
		<td>The full height of the slides.  Determined automatically by default.</td>
	</tr>
	<tr>
		<td>width</td>
		<td>false</td>
		<td>The full width of the slides.  Determined automatically by default.</td>
	</tr>
	<tr>
		<td>scale</td>
		<td>0.85</td>
		<td>Value to scale the full width and height of the slide down to while animating (ie, 0.85 will be 85% of the slide's full size).</td>
	</tr>
	<tr>
		<td>auto</td>
		<td>true</td>
		<td>If false, automatic play will be turned off.</td>
	</tr> 
	<tr>
		<td>speed</td>
		<td>600</td>
		<td>The number of milliseconds for animating the center slide left or right.</td>
	</tr>
	<tr>
		<td>delay</td>
		<td>1500</td>
		<td>If auto-play is one, this will be the number of milliseconds between animations.</td>
	</tr> 
	<tr>
		<td>buttons</td>
		<td>true</td>
		<td>Adds anchor elements ('a.monteNext, a.montePrev, a.montePlay') to the container element that are used to manually control the animation.</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>false</td>
		<td>A callback function to be executed when the animation has completed.  The execution context (the value of <code>this</code>) will be an array of the slide elements, sorted so that the center slide is at the beginning of the array, the next slide is 2nd in the array, and the previous slide is at the end of the array.
		</td>
	</tr>
	<tr>
		<td>callbackIn</td>
		<td>false</td>
		<td>Similar to callback except this function to be executed when a left or right slide is being moved to the center position.  See the demo's source for an example.</td>
	</tr>
	<tr>
		<td>callbackAway</td>
		<td>false</td>
		<td>Similar to callback except this function to be executed when the center slide is being moved to the left or right position.  See the demo's source for an example.</td>
	</tr>
	<tr>
		<td>next</td>
		<td>"Next"</td>
		<td>Text or HTML for the next button (a.monteNext).</td>
	</tr>
	<tr>
		<td>prev</td>
		<td>"Prev"</td>
		<td>Text or HTML for the prev button (a.montePrev).</td>
	</tr>
	<tr>
		<td>pause</td>
		<td>"Pause"</td>
		<td>Text or HTML for the play button while automatic playback is on (a.montePlay).</td>
	</tr>
	<tr>
		<td>play</td>
		<td>"Play"</td>
		<td>Text or HTML for the play button while automatic playback is off (a.montePlay.montePaused).</td>
	</tr>
</table>

## Methods

`$.monte` returns an object containing methods used to control playback:

	var player = $.monte('#container');
	player.pause();
	player.prev();

<table>
	<tr>
		<td>.next()</td>
		<td>Brings the right-hand slide to the top.</td>
	</tr>
	<tr>
		<td>.prev()</td>
		<td>Brings the left-hand slide to the top.</td>
	</tr>
	<tr>
		<td>.play()</td>
		<td>Starts automatic play</td>
	</tr>
	<tr>
		<td>.pause()</td>
		<td>Stops automatic play</td>
	</tr>
</table>

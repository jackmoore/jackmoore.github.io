---
title: Working with JavaScript click events
layout: post
meta: Fine tuning click events.
date: 2011-08-20
tags: [jQuery, JavaScript]
---

## A Greedy Click Event

	// Example of a typical click-event binding:
	jQuery('a#example').click(function(e){
		console.log('click!');
		e.preventDefault();
	});

Here the click event has been intercepted and the default behavior canceled to prevent the browser from being directed to a new location.  Depending on the situation, this may cancel more actions than intended.  **A middle-button click or ctrl+click (open in new tab), shift+click (open in new window), or alt+click (download) would be canceled as well**.

If the intention was to only cancel an unmodified left-click, then other mouse buttons and event modifiers should be filtered out.

## A Discriminating Click Event

	$('a#example').mousedown(function(e){
		if (e.which == 1 && !(e.shiftKey || e.altKey || e.metaKey)) {
			$(this).unbind('click.lc').bind('click.lc', function(event){
				console.log('click!');
				event.preventDefault();
			});
		}
	});

This would be much more involved if it were not for jQuery normalizing the event object to W3C standards:

* Event.which is the normalized button identifier (left-click will be '1' for all browsers).
* Event.metaKey is the normalized ctrl (for PC) and command (for MacOS) event modifier.
* Event.preventDefault() is the normalized method for stopping the browser's default action.

The reason to detect the mousedown seperately from the click event itself is that IE only provides button identification for mousedown and mouseup events.  There is no way to detect which mouse button was clicked from a click event object in IE.  Since the mousedown event does not necessarily preceed a click event, the click event handler should be unbound first to insure that it is not applied multiple times.  I namedspaced the event ('.lc' for 'left-click') so that any unrelated event handlers would not be unbound as well.

A *Good Enough* approach would be to simply ignore IE's lack of button identification:

	$('a#example').click(function(e){
		if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
			console.log('click!');
			e.preventDefault();
		}
	});

This works perfectly for non-IE browsers because the lowest button identifier is 1, and that is for the left-mouse-button.  If e.which is greater than 1, then it had to have been from another mouse-button.  For click events, jQuery sets e.which to 0 for every mouse-button in IE.  Not being able to identify which mouse-button is not that important in most cases.  The right-mouse-button does not need to be identified because it does not generate a click event, it generates a contextmenu event.  In IE the default behavior of a middle-click on anchor elements with a valid non-fragment href property cannot be canceled, so there is no need to identify it for purposes of exclusion.
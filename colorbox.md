---
title: Colorbox - a jQuery lightbox
layout: post
meta: A lightweight customizable lightbox plugin for jQuery
permalink: /colorbox/
---

<a href="http://github.com/jackmoore/colorbox" id='fork'>Fork me on GitHub</a>

## View Demos

<a href='/colorbox/example1/' class='demo'>1</a>
<a href='/colorbox/example2/' class='demo'>2</a>
<a href='/colorbox/example3/' class='demo'>3</a>
<a href='/colorbox/example4/' class='demo'>4</a>
<a href='/colorbox/example5/' class='demo'>5</a>

<h2><a href='https://github.com/jackmoore/colorbox/archive/master.zip' style='text-decoration: underline;'>Download</a></h2>

Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>.  Source on <a href='http://github.com/jackmoore/colorbox'>Github</a> (<a href='http://github.com/jackmoore/colorbox#changelog'>changelog</a>).<br>
Compatible with: jQuery 1.3.2+ in Firefox, Safari, Chrome, Opera, Internet Explorer 7+<br>
Bower Package: `jquery-colorbox`

<p>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=colorbox&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=colorbox&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe>

* Supports photos, grouping, slideshow, ajax, inline, and iframed content.
* Lightweight: 10KB of JavaScript (less than 5KBs gzipped).
* Appearance is controlled through CSS so it can be restyled.
* Can be extended with callbacks & event-hooks without altering the source files.
* Completely unobtrusive, options are set in the JS and require no changes to existing HTML.
* Preloads upcoming images in a photo group.
* Currently used on more than <a href='http://trends.builtwith.com/javascript/jQuery-Colorbox'>1.9 million websites</a>.

## Instructions & Help

The <a href='/colorbox/faq/'>FAQ</a> has instructions on asking for help, solutions to common problems, and how-to examples. First-time jQuery users can check out the Colorbox <a href='/colorbox/guide/'>Beginner's Guide</a>. Intermediate users can probably glean everything needed by view-source'ing the demo pages.

## Usage

Colorbox accepts settings from an object of key/value pairs, and can be assigned to any HTML element.

````javascript
// Format:
$(selector).colorbox({key:value, key:value, key:value});
````

````javascript
// Examples:
// Image links displayed as a group
$('a.gallery').colorbox({rel:'gal'});

// Ajax
$('a#login').colorbox();

// Called directly, without assignment to an element:
$.colorbox({href:"thankyou.html"});

// Called directly with HTML
$.colorbox({html:"<h1>Welcome</h1>"});

// Colorbox can accept a function in place of a static value:
$("a.gallery").colorbox({rel: 'gal', title: function(){
  var url = $(this).attr('href');
  return '<a href="' + url + '" target="_blank">Open In New Window</a>';
}});
````

## Settings

<table>
  <tr>
    <th>Property
    <th>Default
    <th>Description

  <tr id='setting-transition'>
    <td>transition
    <td>"elastic"
    <td>The transition type. Can be set to "elastic", "fade", or "none".

  <tr id='setting-speed'>
    <td>speed
    <td>350
    <td>Sets the speed of the fade and elastic transitions, in milliseconds.

  <tr id='setting-href'>
    <td>href
    <td>false
    <td>This can be used as an alternative anchor URL or to associate a URL for non-anchor elements such as images or form buttons. <code>$("h1").colorbox({href:"welcome.html"});</code>

  <tr id='setting-title'>
    <td>title
    <td>false
    <td>This can be used as an anchor title alternative for Colorbox.

  <tr id='setting-rel'>
    <td>rel
    <td>false
    <td>This can be used as an anchor rel alternative for Colorbox.  This allows the user to group any combination of elements together for a gallery, or to override an existing rel so elements are not grouped together.  <code>$("a.gallery").colorbox({rel:"group1"});</code> Note: The value can also be set to 'nofollow' to disable grouping.
 
  <tr id='setting-scalephotos'>
    <td>scalePhotos
    <td>true
    <td>If true, and if maxWidth, maxHeight, innerWidth, innerHeight, width, or height have been defined, Colorbox will scale photos to fit within the those values.

  <tr id='setting-scrolling'>
    <td>scrolling
    <td>true
    <td>If false, Colorbox will hide scrollbars for overflowing content.  This could be used on conjunction with the resize method (see below) for a smoother transition if you are appending content to an already open instance of Colorbox.

  <tr id='setting-opacity'>
    <td>opacity
    <td>0.85
    <td>The overlay opacity level. Range: 0 to 1.

  <tr id='setting-open'>
    <td>open
    <td>false
    <td>If true, Colorbox will immediately open.

  <tr id='setting-returnfocus'>
    <td>returnFocus
    <td>true
    <td>If true, focus will be returned when Colorbox exits to the element it was launched from.

  <tr id='setting-trapfocus'>
    <td>trapFocus
    <td>true
    <td>If true, keyboard focus will be limited to Colorbox's navigation and content.

  <tr id='setting-fastiframe'>
    <td>fastIframe
    <td>true
    <td>If false, the loading graphic removal and onComplete event will be delayed until iframe's content has completely loaded.

  <tr id='setting-preloading'>
    <td>preloading
    <td>true
    <td>Allows for preloading of 'Next' and 'Previous' content in a group, after the current content has finished loading.  Set to false to disable.

  <tr id='setting-overlayclose'>
    <td>overlayClose
    <td>true
    <td>If false, disables closing Colorbox by clicking on the background overlay.

  <tr id='setting-esckey'>
    <td>escKey
    <td>true
    <td>If false, will disable closing colorbox on 'esc' key press.

  <tr id='setting-arrowkey'>
    <td>arrowKey
    <td>true
    <td>If false, will disable the left and right arrow keys from navigating between the items in a group.

  <tr id='setting-loop'>
    <td>loop
    <td>true
    <td>If false, will disable the ability to loop back to the beginning of the group when on the last element.

  <tr id='setting-data'>
    <td>data
    <td>false
    <td>For submitting GET or POST values through an ajax request.  The data property will act exactly like jQuery's <a href='http://api.jquery.com/load/'>.load()</a> data argument, as Colorbox uses .load() for ajax handling.

  <tr id='setting-className'>
    <td>className
    <td>false
    <td>Adds a given class to colorbox and the overlay.

  <tr id='setting-fadeOut'>
    <td>fadeOut
    <td>300
    <td>Sets the fadeOut speed, in milliseconds, when closing Colorbox.

  <tr id='setting-closeButton'>
    <td>closeButton
    <td>true
    <td>Set to false to remove the close button.


  <tr>
    <th>Internationalization
    <th>
    <th>

  <tr id='setting-current'>
    <td>current
    <td>"image {current} of {total}"
    <td>Text or HTML for the group counter while viewing a group.  {current} and {total} are detected and replaced with actual numbers while Colorbox runs.

  <tr id='setting-previous'>
    <td>previous
    <td>"previous"
    <td>Text or HTML for the previous button while viewing a group.

  <tr id='setting-next'>
    <td>next
    <td>"next"
    <td>Text or HTML for the next button while viewing a group.

  <tr id='setting-close'>
    <td>close
    <td>"close"
    <td>Text or HTML for the close button.  The 'esc' key will also close Colorbox.

  <tr id='setting-xhrError'>
    <td>xhrError
    <td>"This content failed to load."
    <td>Error message given when ajax content for a given URL cannot be loaded.

  <tr id='setting-imgError'>
    <td>imgError
    <td>"This image failed to load."
    <td>Error message given when a link to an image fails to load.


  <tr>
    <th>Content Type
    <th>
    <th>

  <tr id='setting-iframe'>
    <td>iframe
    <td>false
    <td>If true, specifies that content should be displayed in an iFrame.

  <tr id='setting-inline'>
    <td>inline
    <td>false
    <td><p>If true, content from the current document can be displayed by passing the href property a jQuery selector, or jQuery object.
<pre><code>// Using a selector:
$("#inline").colorbox({inline:true, href:"#myForm"});

// Using a jQuery object:
var $form = $("#myForm");
$("#inline").colorbox({inline:true, href:$form});
</code></pre>
    

  <tr id='setting-html'>
    <td>html
    <td>false
    <td>For displaying a string of HTML or text: <code>$.colorbox({html:"&lt;p&gt;Hello&lt;/p&gt;"});</code>

  <tr id='setting-photo'>
    <td>photo
    <td>false
    <td>If true, this setting forces Colorbox to display a link as a photo.  Use this when automatic photo detection fails (such as using a url like 'photo.php' instead of 'photo.jpg')

  <tr id='setting-ajax'>
    <td>ajax
    <td>
    <td>This property isn't actually used as Colorbox assumes all hrefs should be treated as either ajax or photos, unless one of the other content types were specified.

  <tr id='setting-dimensions'>
    <th>Dimensions
    <th>
    <th>

  <tr id='setting-width'>
    <td>width
    <td>false
    <td>Set a fixed total width. This includes borders and buttons. Example: "100%", "500px", or 500

  <tr id='setting-height'>
    <td>height
    <td>false
    <td>Set a fixed total height. This includes borders and buttons. Example: "100%", "500px", or 500

  <tr id='setting-innerwidth'>
    <td>innerWidth
    <td>false
    <td>This is an alternative to 'width' used to set a fixed inner width. This excludes borders and buttons. Example: "50%", "500px", or 500

  <tr id='setting-innerheight'>
    <td>innerHeight
    <td>false
    <td>This is an alternative to 'height' used to set a fixed inner height. This excludes borders and buttons. Example: "50%", "500px", or 500

  <tr id='setting-initialwidth'>
    <td>initialWidth
    <td>300
    <td>Set the initial width, prior to any content being loaded.

  <tr id='setting-initialheight'>
    <td>initialHeight
    <td>100
    <td>Set the initial height, prior to any content being loaded.

  <tr id='setting-maxwidth'>
    <td>maxWidth
    <td>false
    <td>Set a maximum width for loaded content. Example: "100%", 500, "500px"

  <tr id='setting-maxheight'>
    <td>maxHeight
    <td>false
    <td>Set a maximum height for loaded content. Example: "100%", 500, "500px"

  <tr>
    <th>Slideshow
    <th>
    <th>

  <tr id='setting-slideshow'>
    <td>slideshow
    <td>false
    <td>If true, adds an automatic slideshow to a content group / gallery.

  <tr id='setting-slideshowspeed'>
    <td>slideshowSpeed
    <td>2500
    <td>Sets the speed of the slideshow, in milliseconds.

  <tr id='setting-slideshowauto'>
    <td>slideshowAuto
    <td>true
    <td>If true, the slideshow will automatically start to play.

  <tr id='setting-slideshowstart'>
    <td>slideshowStart
    <td>"start slideshow"
    <td>Text for the slideshow start button.

  <tr id='setting-slideshowstop'>
    <td>slideshowStop
    <td>"stop slideshow"
    <td>Text for the slideshow stop button

  <tr>
    <th>Positioning
    <th>
    <th>

  <tr id='setting-fixed'>
    <td>fixed
    <td>false
    <td>If true, Colorbox will be displayed in a fixed position within the visitor's viewport.  This is unlike the default absolute positioning relative to the document.

  <tr id='setting-top'>
    <td>top
    <td>false
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls Colorbox's vertical positioning instead of using the default position of being centered in the viewport.

  <tr id='setting-bottom'>
    <td>bottom
    <td>false
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls Colorbox's vertical positioning instead of using the default position of being centered in the viewport.

  <tr id='setting-left'>
    <td>left
    <td>false
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls Colorbox's horizontal positioning instead of using the default position of being centered in the viewport.

  <tr id='setting-right'>
    <td>right
    <td>false
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls Colorbox's horizontal positioning instead of using the default position of being centered in the viewport.

  <tr id='setting-reposition'>
    <td>reposition
    <td>true
    <td>Repositions Colorbox if the window's resize event is fired.

  <tr id='setting-retina'>
    <th>Retina Images
    <th>
    <th>

  <tr id='setting-retinaImage'>
    <td>retinaImage
    <td>false
    <td>If true, Colorbox will scale down the current photo to match the screen's pixel ratio

  <tr id='setting-retinaUrl'>
    <td>retinaUrl
    <td>false
    <td>If true and the device has a high resolution display, Colorbox will replace the current photo's file extention with the retinaSuffix+extension

  <tr id='setting-retinaSuffix'>
    <td>retinaSuffix
    <td>"@2x.$1"
    <td>If retinaUrl is true and the device has a high resolution display, the href value will have it's extention extended with this suffix.  For example, the default value would change `my-photo.jpg` to `my-photo@2x.jpg`

  <tr>
    <th>Callbacks
    <th>
    <th>

  <tr id='setting-onopen'>
    <td>onOpen
    <td>false
    <td>Callback that fires right before Colorbox begins to open.

  <tr id='setting-onload'>
    <td>onLoad
    <td>false
    <td>Callback that fires right before attempting to load the target content.

  <tr id='setting-oncomplete'>
    <td>onComplete
    <td>false
    <td>Callback that fires right after loaded content is displayed.

  <tr id='setting-oncleanup'>
    <td>onCleanup
    <td>false
    <td>Callback that fires at the start of the close process.

  <tr id='setting-onclosed'>
    <td>onClosed
    <td>false
    <td>Callback that fires once Colorbox is closed.

</table>

## Public Methods

<table>
  <tr>
    <td>$.colorbox()
    <td>This method allows you to call Colorbox without having to assign it to an element.  <code>$.colorbox({href:"login.php"});</code>

  <tr>
    <td>$.colorbox.next()<br> $.colorbox.prev()
    <td>These methods moves to the next and previous items in a group and are the same as pressing the 'next' or 'previous' buttons.

  <tr>
    <td>$.colorbox.close()
    <td>This method initiates the close sequence, which does not immediately complete.  The lightbox will be completely closed only when the <code>cbox_closed</code> event / <code>onClosed</code> callback is fired.

  <tr>
    <td>$.colorbox.element()
    <td>This method is used to fetch the current HTML element that Colorbox is associated with.  Returns a jQuery object containing the element. <code>var $element = $.colorbox.element();</code>

  <tr>
    <td>$.colorbox.resize()
    <td>This allows Colorbox to be resized based on it's own auto-calculations, or to a specific size.
    This must be called manually after Colorbox's content has loaded.
    The optional parameters object can accept <code>width</code> or <code>innerWidth</code> and <code>height</code> or <code>innerHeight</code>.
    Without specifying a width or height, Colorbox will attempt to recalculate the height of it's current content.

  <tr>
    <td>$.colorbox.remove()
    <td>Removes all traces of Colorbox from the document.  Not the same as $.colorbox.close(), which tucks colorbox away for future use.
</table>

## Event Hooks

These event hooks fire at the same time as their corresponding callbacks (ie. cbox_complete & onComplete), but can be used to make a universal change to Colorbox, while callbacks are only applied to selected elements.

```javascript
// Example of using an event listener and public method to build a primitive slideshow:
$(document).bind('cbox_complete', function(){
  setTimeout($.colorbox.next, 1500);
});
```

<table>
  <tr>
    <td>cbox_open
    <td>triggers when Colorbox is first opened, but after a few key variable assignments take place.

  <tr>
    <td>cbox_load
    <td>triggers at the start of the phase where content type is determined and loaded.

  <tr>
    <td>cbox_complete
    <td>triggers when the transition has completed and the newly loaded content has been revealed.

  <tr>
    <td>cbox_cleanup
    <td>triggers as the close method begins.

  <tr>
    <td>cbox_closed
    <td>triggers as the close method ends.
</table>
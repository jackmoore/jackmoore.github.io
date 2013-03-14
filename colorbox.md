---
title: ColorBox - a jQuery lightbox
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

<p>Released under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a>.  Source on <a href='http://github.com/jackmoore/colorbox'>Github</a> (<a href='http://github.com/jackmoore/colorbox#changelog'>changelog</a>).<br/>
  Compatible with: jQuery 1.3.2+ in Firefox, Safari, Chrome, Opera, Internet Explorer 6, 7, 8, 9, 10.</p>
<p>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=colorbox&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="97" height="20"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;repo=colorbox&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="95" height="20"></iframe></p>

## Features

* Supports photos, grouping, slideshow, ajax, inline, and iframed content.
* Lightweight: 10KB of JavaScript (less than 5KBs gzipped).
* Appearance is controlled through CSS so it can be restyled.
* Can be extended with callbacks & event-hooks without altering the source files.
* Completely unobtrusive, options are set in the JS and require no changes to existing HTML.
* Preloads upcoming images in a photo group.
* Well vetted and currently in use in over <a href='http://trends.builtwith.com/javascript/jQuery-Colorbox'>600,000 websites</a>.

## Instructions & Help

The <a href='/colorbox/faq/'>FAQ</a> has instructions on asking for help, solutions to common problems, and how-to examples. First-time jQuery users can check out the ColorBox <a href='/colorbox/guide/'>Beginner's Guide</a>. Intermediate users can probably glean everything needed by view-source'ing the demo pages.

## Usage

ColorBox accepts settings from an object of key/value pairs, and can be assigned to any HTML element.

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

// ColorBox can accept a function in place of a static value:
$("a.gallery").colorbox({rel: 'gal', title: function(){
  var url = $(this).attr('href');
  return '<a href="' + url + '" target="_blank">Open In New Window</a>';
}});
````

## Settings

<table>
  <tr>
    <th>Property</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr id='setting-transition'>
    <td>transition</td>
    <td>"elastic"</td>
    <td>The transition type. Can be set to "elastic", "fade", or "none".</td>
  </tr>
  <tr id='setting-speed'>
    <td>speed</td>
    <td>350</td>
    <td>Sets the speed of the fade and elastic transitions, in milliseconds.</td>
  </tr>
  <tr id='setting-href'>
    <td>href</td>
    <td>false</td>
    <td>This can be used as an alternative anchor URL or to associate a URL for non-anchor elements such as images or form buttons. <code>$("h1").colorbox({href:"welcome.html"});</code></td>
  </tr>
  <tr id='setting-title'>
    <td>title</td>
    <td>false</td>
    <td>This can be used as an anchor title alternative for ColorBox.</td>
  </tr>
  <tr id='setting-rel'>
    <td>rel</td>
    <td>false</td>
    <td>This can be used as an anchor rel alternative for ColorBox.  This allows the user to group any combination of elements together for a gallery, or to override an existing rel so elements are not grouped together.  <code>$("a.gallery").colorbox({rel:"group1"});</code> Note: The value can also be set to 'nofollow' to disable grouping.</td>
  </tr> 
  <tr id='setting-scalephotos'>
    <td>scalePhotos</td>
    <td>true</td>
    <td>If true, and if maxWidth, maxHeight, innerWidth, innerHeight, width, or height have been defined, ColorBox will scale photos to fit within the those values.</td>
  </tr>
  <tr id='setting-scrolling'>
    <td>scrolling</td>
    <td>true</td>
    <td>If false, ColorBox will hide scrollbars for overflowing content.  This could be used on conjunction with the resize method (see below) for a smoother transition if you are appending content to an already open instance of ColorBox.</td>
  </tr>
  <tr id='setting-opacity'>
    <td>opacity</td>
    <td>0.85</td>
    <td>The overlay opacity level. Range: 0 to 1.</td>
  </tr>
  <tr id='setting-open'>
    <td>open</td>
    <td>false</td>
    <td>If true, ColorBox will immediately open.</td>
  </tr>
  <tr id='setting-returnfocus'>
    <td>returnFocus</td>
    <td>true</td>
    <td>If true, focus will be returned when ColorBox exits to the element it was launched from.</td>
  </tr>
  <tr id='setting-fastiframe'>
    <td>fastIframe</td>
    <td>true</td>
    <td>If false, the loading graphic removal and onComplete event will be delayed until iframe's content has completely loaded.</td>
  </tr>
  <tr id='setting-preloading'>
    <td>preloading</td>
    <td>true</td>
    <td>Allows for preloading of 'Next' and 'Previous' content in a group, after the current content has finished loading.  Set to false to disable.</td>
  </tr>
  <tr id='setting-overlayclose'>
    <td>overlayClose</td>
    <td>true</td>
    <td>If false, disables closing ColorBox by clicking on the background overlay.</td>
  </tr>
  <tr id='setting-esckey'>
    <td>escKey</td>
    <td>true</td>
    <td>If false, will disable closing colorbox on 'esc' key press.</td>
  </tr>
  <tr id='setting-arrowkey'>
    <td>arrowKey</td>
    <td>true</td>
    <td>If false, will disable the left and right arrow keys from navigating between the items in a group.</td>
  </tr>
  <tr id='setting-loop'>
    <td>loop</td>
    <td>true</td>
    <td>If false, will disable the ability to loop back to the beginning of the group when on the last element.</td>
  </tr>
  <tr id='setting-data'>
    <td>data</td>
    <td>false</td>
    <td>For submitting GET or POST values through an ajax request.  The data property will act exactly like jQuery's <a href='http://api.jquery.com/load/'>.load()</a> data argument, as ColorBox uses .load() for ajax handling.</td>
  </tr>
  <tr id='setting-className'>
    <td>className</td>
    <td>false</td>
    <td>Adds a given class to colorbox and the overlay.</td>
  </tr>

  <tr>
    <th>Internationalization</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-current'>
    <td>current</td>
    <td>"image {current} of {total}"</td>
    <td>Text or HTML for the group counter while viewing a group.  {current} and {total} are detected and replaced with actual numbers while ColorBox runs.</td>
  </tr>
  <tr id='setting-previous'>
    <td>previous</td>
    <td>"previous"</td>
    <td>Text or HTML for the previous button while viewing a group.</td>
  </tr>
  <tr id='setting-next'>
    <td>next</td>
    <td>"next"</td>
    <td>Text or HTML for the next button while viewing a group.</td>
  </tr>
  <tr id='setting-close'>
    <td>close</td>
    <td>"close"</td>
    <td>Text or HTML for the close button.  The 'esc' key will also close ColorBox.</td>
  </tr>
  <tr id='setting-xhrError'>
    <td>xhrError</td>
    <td>"This content failed to load."</td>
    <td>Error message given when ajax content for a given URL cannot be loaded.</td>
  </tr>
  <tr id='setting-imgError'>
    <td>imgError</td>
    <td>"This image failed to load."</td>
    <td>Error message given when a link to an image fails to load.</td>
  </tr>

  <tr>
    <th>Content Type</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-iframe'>
    <td>iframe</td>
    <td>false</td>
    <td>If true, specifies that content should be displayed in an iFrame.</td>
  </tr>
  <tr id='setting-inline'>
    <td>inline</td>
    <td>false</td>
    <td><p>If true, content from the current document can be displayed by passing the href property a jQuery selector, or jQuery object.</p>
<pre><code>// Using a selector:
$("#inline").colorbox({inline:true, href:"#myForm"});

// Using a jQuery object:
var $form = $("#myForm");
$("#inline").colorbox({inline:true, href:$form});
</code></pre>
    </td>
  </tr>
  <tr id='setting-html'>
    <td>html</td>
    <td>false</td>
    <td>For displaying a string of HTML or text: <code>$.colorbox({html:"&lt;p&gt;Hello&lt;/p&gt;"});</code></td>
  </tr>
  <tr id='setting-photo'>
    <td>photo</td>
    <td>false</td>
    <td>If true, this setting forces ColorBox to display a link as a photo.  Use this when automatic photo detection fails (such as using a url like 'photo.php' instead of 'photo.jpg')</td>
  </tr>
  <tr id='setting-ajax'>
    <td>ajax</td>
    <td></td>
    <td>This property isn't actually used as ColorBox assumes all hrefs should be treated as either ajax or photos, unless one of the other content types were specified.</td>
  </tr>
  <tr id='setting-dimensions'>
    <th>Dimensions</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-width'>
    <td>width</td>
    <td>false</td>
    <td>Set a fixed total width. This includes borders and buttons. Example: "100%", "500px", or 500</td>
  </tr>
  <tr id='setting-height'>
    <td>height</td>
    <td>false</td>
    <td>Set a fixed total height. This includes borders and buttons. Example: "100%", "500px", or 500</td>
  </tr>
  <tr id='setting-innerwidth'>
    <td>innerWidth</td>
    <td>false</td>
    <td>This is an alternative to 'width' used to set a fixed inner width. This excludes borders and buttons. Example: "50%", "500px", or 500</td>
  </tr>
  <tr id='setting-innerheight'>
    <td>innerHeight</td>
    <td>false</td>
    <td>This is an alternative to 'height' used to set a fixed inner height. This excludes borders and buttons. Example: "50%", "500px", or 500</td>
  </tr>
  <tr id='setting-initialwidth'>
    <td>initialWidth</td>
    <td>300</td>
    <td>Set the initial width, prior to any content being loaded.</td>
  </tr>
  <tr id='setting-initialheight'>
    <td>initialHeight</td>
    <td>100</td>
    <td>Set the initial height, prior to any content being loaded.</td>
  </tr>
  <tr id='setting-maxwidth'>
    <td>maxWidth</td>
    <td>false</td>
    <td>Set a maximum width for loaded content. Example: "100%", 500, "500px"</td>
  </tr>
  <tr id='setting-maxheight'>
    <td>maxHeight</td>
    <td>false</td>
    <td>Set a maximum height for loaded content. Example: "100%", 500, "500px"</td>
  </tr>
  <tr>
    <th>Slideshow</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-slideshow'>
    <td>slideshow</td>
    <td>false</td>
    <td>If true, adds an automatic slideshow to a content group / gallery.</td>
  </tr>
  <tr id='setting-slideshowspeed'>
    <td>slideshowSpeed</td>
    <td>2500</td>
    <td>Sets the speed of the slideshow, in milliseconds.</td>
  </tr>
  <tr id='setting-slideshowauto'>
    <td>slideshowAuto</td>
    <td>true</td>
    <td>If true, the slideshow will automatically start to play.</td>
  </tr>
  <tr id='setting-slideshowstart'>
    <td>slideshowStart</td>
    <td>"start slideshow"</td>
    <td>Text for the slideshow start button.</td>
  </tr>
  <tr id='setting-slideshowstop'>
    <td>slideshowStop</td>
    <td>"stop slideshow"</td>
    <td>Text for the slideshow stop button</td>
  </tr>
  <tr>
    <th>Positioning</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-fixed'>
    <td>fixed</td>
    <td>false</td>
    <td>If true, ColorBox will be displayed in a fixed position within the visitor's viewport.  This is unlike the default absolute positioning relative to the document.</td>
  </tr>
  <tr id='setting-top'>
    <td>top</td>
    <td>false</td>
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls ColorBox's vertical positioning instead of using the default position of being centered in the viewport.</td>
  </tr>
  <tr id='setting-bottom'>
    <td>bottom</td>
    <td>false</td>
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls ColorBox's vertical positioning instead of using the default position of being centered in the viewport.</td>
  </tr>
  <tr id='setting-left'>
    <td>left</td>
    <td>false</td>
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls ColorBox's horizontal positioning instead of using the default position of being centered in the viewport.</td>
  </tr>
  <tr id='setting-right'>
    <td>right</td>
    <td>false</td>
    <td>Accepts a pixel or percent value (50, "50px", "10%").  Controls ColorBox's horizontal positioning instead of using the default position of being centered in the viewport.</td>
  </tr>
  <tr id='setting-retina'>
    <th>Retina Images</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-retinaImage'>
    <td>retinaImage</td>
    <td>false</td>
    <td>If true, ColorBox will scale down the current photo to match the screen's pixel ratio</td>
  </tr>
  <tr id='setting-retinaUrl'>
    <td>retinaUrl</td>
    <td>false</td>
    <td>If true and the device has a high resolution display, ColorBox will replace the current photo's file extention with the retinaSuffix+extension</td>
  </tr>
  <tr id='setting-retinaSuffix'>
    <td>retinaSuffix</td>
    <td>"@2x.$1"</td>
    <td>If retinaUrl is true and the device has a high resolution display, the href value will have it's extention extended with this suffix.  For example, the default value would change `my-photo.jpg` to `my-photo@2x.jpg`</td>
  </tr>
  <tr>
    <th>Callbacks</th>
    <th></th>
    <th></th>
  </tr>
  <tr id='setting-onopen'>
    <td>onOpen</td>
    <td>false</td>
    <td>Callback that fires right before ColorBox begins to open.</td>
  </tr>
  <tr id='setting-onload'>
    <td>onLoad</td>
    <td>false</td>
    <td>Callback that fires right before attempting to load the target content.</td>
  </tr>
  <tr id='setting-oncomplete'>
    <td>onComplete</td>
    <td>false</td>
    <td>Callback that fires right after loaded content is displayed.</td>
  </tr>
  <tr id='setting-oncleanup'>
    <td>onCleanup</td>
    <td>false</td>
    <td>Callback that fires at the start of the close process.</td>
  </tr>
  <tr id='setting-onclosed'>
    <td>onClosed</td>
    <td>false</td>
    <td>Callback that fires once ColorBox is closed.</td>
  </tr>
</table>

## Public Methods

<table>
  <tr>
    <td>$.colorbox()</td>
    <td>This method allows you to call ColorBox without having to assign it to an element.  <code>'$.colorbox({href:"login.php"});</code></td>
  </tr>
  <tr>
    <td>$.colorbox.next()<br/> $.colorbox.prev()</td>
    <td>These methods moves to the next and previous items in a group and are the same as pressing the 'next' or 'previous' buttons.</td>
  </tr>
  <tr>
    <td>$.colorbox.close()</td>
    <td>This method initiates the close sequence, which does not immediately complete.  The lightbox will be completely closed only when the <code>cbox_closed</code> event / <code>onClosed</code> callback is fired.</td>
  </tr>
  <tr>
    <td>$.colorbox.element()</td>
    <td>This method is used to fetch the current HTML element that ColorBox is associated with.  Returns a jQuery object containing the element. <code>var $element = $.colorbox.element();</code></td>
  </tr>
  <tr>
    <td>$.colorbox.resize()</td>
    <td>This allows ColorBox to be resized based on it's own auto-calculations, or to a specific size.
    This must be called manually after ColorBox's content has loaded.
    The optional parameters object can accept <code>width</code> or <code>innerWidth</code> and <code>height</code> or <code>innerHeight</code>.
    Without specifying a width or height, ColorBox will attempt to recalculate the height of it's current content.</td>
  </tr>
  <tr>
    <td>$.colorbox.remove()</td>
    <td>Removes all traces of ColorBox from the document.  Not the same as $.colorbox.close(), which tucks colorbox away for future use.</td>
  </tr>
</table>

## Event Hooks

These event hooks fire at the same time as their corresponding callbacks (ie. cbox_complete & onComplete), but can be used to make a universal change to ColorBox, while callbacks are only applied to selected elements.

  // Example of using an event listener and public method to build a primitive slideshow:
  $(document).bind('cbox_complete', function(){
    setTimeout($.colorbox.next, 1500);
  });

<table>
  <tr>
    <td>cbox_open</td>
    <td>triggers when ColorBox is first opened, but after a few key variable assignments take place.</td>
  </tr>
  <tr>
    <td>cbox_load</td>
    <td>triggers at the start of the phase where content type is determined and loaded.</td>
  </tr>
  <tr>
    <td>cbox_complete</td>
    <td>triggers when the transition has completed and the newly loaded content has been revealed.</td>
  </tr>
  <tr>
    <td>cbox_cleanup</td>
    <td>triggers as the close method begins.</td>
  </tr>
  <tr>
    <td>cbox_closed</td>
    <td>triggers as the close method ends.</td>
  </tr>
</table>
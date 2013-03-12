---
title: A Better jQuery Accordion
layout: post
meta: This will be an exercise in using the jQuery slide methods effectively. We'll start with a basic accordion, then improve it.
tags: [jQuery, JavaScript]
---

### First Version:

````html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin:0; padding:0; } /* a simple reset */
    .head, li, h2 { margin-bottom:15px; }
    .head { display:block; }
    .content { display:none; }
  </style>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script>
    $(document).ready(function(){
      $('.head').click(function(e){
        e.preventDefault();
        $(this).closest('li').find('.content').slideToggle();
      });
    });
  </script>
</head>
<body>
  <ul>
    <li>
      <a href='#' class='head'>Heading 1</a>
      <div class='content'>Content 1
      </div>
    </li>
    <li>
      <a href='#' class='head'>Heading 2</a>
      <div class='content'>Content 2</div>
    </li>
    <li>
      <a href='#' class='head'>Heading 3</a>
      <div class='content'>Content 3</div>
    </li>
  </ul>
</body>
</html>
````

### See the [Demo](/demo/accordion.html)

### The Script

The unordered list will be the structure for the accordion, with each list item being one of the panels.  I think documenting the code will make it easier to understand than trying to explain the process, so here is the same script broken up with comments:

````javascript
// Wait until the DOM is loaded, before trying to query the document
$(document).ready(function(){
  
  // select the .head elements, and bind an event handler to them
  $('.head').click(function(e){

    // prevent the default action of the click event
    // ie. prevent the browser from redirecting to the link's href
    e.preventDefault();

    // 'this' is the execution context of the event handler
    // it refers to the clicked .head element
    $(this)

    // Walk up the DOM tree to find the closest list item
    // It is the closest shared ancestor of both .head and .content
    .closest('li')

    // Search the list item for .content
    .find('.content')

    // Trigger the sliding animation on .content
    .slideToggle();
  });
});
````

### Problem 1: It's Jumpy

The demo demonstrated that the first accordion's animation wasn't fluid at all.  jQuery miscalculated the height of the content ('.content') because jQuery gave it an absolute position before measuring the height.  This caused the dimensions to change.  Giving the content a fixed width and/or height would fix this, but that would be impractical for fluid layouts or content of varying size.  An alternative solution is to give the content's parent element a non-static position.  This will insure that the content is positioned relative to the parent, which constrains the content to the width and height we expect it to have.

````css
li { position:relative; }
````

### Problem 2: It's Still Jumpy

There is a bit of a jump at the start of slideDown and end of slideUp from the browser [collapsing adjoining vertical margins](http://www.w3.org/TR/CSS21/box.html#collapsing-margins).  When the slideUp animation completes, jQuery will hide the element being animated.  This means there will no longer be an element in the document flow between the .head element's margin and the list item's margin, triggering a collapse.  This can be prevented if the margins are separated by padding, border, or clearance.  Here are a few examples:

* Use overflow:auto or overflow:hidden on the list item to achieve clearance. I recommend using hidden overflow as auto overflow can cause additional jumping:

  ````css
  li { overflow:hidden; }
  ````

* Or use a transparent border: 

  ````css
  li { border-bottom:1px solid transparent; }
  ````

* Or use padding instead of margin:

  ````css
  .head, li, h2 { padding-bottom:15px; }
  ````

There is currently an [open ticket](http://bugs.jquery.com/ticket/7442) about this on bugs.jquery.com.

### Problem 3: The Animation Queues Up

Clicking on the `<h2>` two or more times in quick succession causes the animation to queue up.  Normally [.stop()](http://api.jquery.com/stop/) is used in this situation, but that causes a major problem with `.slideUp()`.  When called,` .slideUp()` will record the current height as the height `.slideDown()` should return to.  If `.stop()` is called during the slideDown animation, an incomplete height will be recorded making the unrevealed content inaccessible until the document is reloaded.  One way to work around that is to only call `$.slideToggle()` if the content is not currently being animated.

````javascript
$('.head').click(function(e){
  e.preventDefault();
  $(this).closest('li').find('.content').not(':animated').slideToggle();
});
````

### Caching

The results of `$(this).closest('li').find('.content')` could be cached so that the document doesn't have to be queried on each interaction.  A recommended practice, but probably not worth the extra code in this case since we have to create a closure to hold it.  The click event happens infrequently (or never if the user chooses not to interact with the accordion).  If we were binding to a high frequency event, such as mousemove, caching would be much more important.

````javascript
// .each() is used to create a closure to store a cache of the query.
$('.head').each(function(){
  var $content = $(this).closest('li').find('.content');
  $(this).click(function(e){
    e.preventDefault();
    $content.not(':animated').slideToggle();
  });
});
````

### See the [Demo](/demo/accordion.html)

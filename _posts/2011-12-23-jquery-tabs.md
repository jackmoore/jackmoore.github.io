---
title: jQuery Tabs Tutorial
meta: Tabs are easy to implement and can be built to work with your existing markup. This guide will walk through the process.
tags: [jQuery, JavaScript]
layout: post
---

<iframe class='demo' src='/demo/tabs.html' style='height:180px' frameborder='0'></iframe>

### Writing the Markup

Lets start by writing our markup as if our visitor doesn't even have JavaScript enabled.  Even if you do not wish to support users without JavaScript, it is still a good pattern to follow to exercise [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns).

````html
  <ul class='tabs'>
    <li><a href='#tab1'>Tab 1</a></li>
    <li><a href='#tab2'>Tab 2</a></li>
    <li><a href='#tab3'>Tab 3</a></li>
  </ul>
  <div id='tab1'>
    <p>Hi, this is the first tab.</p>
  </div>
  <div id='tab2'>
    <p>This is the 2nd tab.</p>
  </div>
  <div id='tab3'>
    <p>And this is the 3rd tab.</p>
  </div>
````

I used fragment identifiers (`#tab1`, `#tab2`, `#tab3`) for the href values in the navigation.  Each element containing a tab's content is given an ID that corresponds to a fragment identifier.  This way the links are semantic and continue to be functional even if the visitor has JavaScript disabled.

A nice side effect of using only a fragment identifier for the href value is that retrieving the value through jQuery's .attr() method will give us the exact selector we need to query the document for that tab's content, ie. `$('ul.tabs a').attr('href')` will return `#tab1`.

### Writing the jQuery

Rather than describing the code, I am just going to include it with comments that explain each step.

````javascript
$('ul.tabs').each(function(){
  // For each set of tabs, we want to keep track of
  // which tab is active and it's associated content
  var $active, $content, $links = $(this).find('a');

  // If the location.hash matches one of the links, use that as the active tab.
  // If no match is found, use the first link as the initial active tab.
  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
  $active.addClass('active');
  $content = $($active.attr('href'));

  // Hide the remaining content
  $links.not($active).each(function () {
    $($(this).attr('href')).hide();
  });

  // Bind the click event handler
  $(this).on('click', 'a', function(e){
    // Make the old tab inactive.
    $active.removeClass('active');
    $content.hide();

    // Update the variables with the new link and content
    $active = $(this);
    $content = $($(this).attr('href'));

    // Make the tab active.
    $active.addClass('active');
    $content.show();

    // Prevent the anchor's default click action
    e.preventDefault();
  });
});
````

[See the complete document](/demo/tabs.html). I used jQuery's [.on()](http://api.jquery.com/on/) method for event binding, so be sure to use jQuery 1.7 or higher.
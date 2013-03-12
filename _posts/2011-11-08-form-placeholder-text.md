---
title: HTML5 Placeholder Attribute
layout: post
meta: A guide to using the attribute, and support it for older browsers.
tags: [HTML5, JavaScript, jQuery]
---

## Placeholder

Placeholder text is a short example or hint text that is shown in a form field when the field is unfocused and has no input from the user.

<form action='#' method='get' style='padding:15px 15px 0; margin-bottom:14px; background:#F4EFE9 url(/img/tiles/wood.png);'>
  <input type='text' name='demo-name' placeholder='Name' style='width:40%; background:#fff;'/><br/>
  <input type='text' name='demo-email' placeholder='Email Address' style='width:40%; background:#fff;'/><br/>
  <textarea name='demo-comment' placeholder='Message' style='width:95%; background:#fff;'></textarea><br/>
  <input type='submit' value='Submit' onclick='return false;'/>
</form>

This could be considered a poor example, as label elements should be used for maximum accessibility.  Not showing labels can make forms look less complex, increasing usability, but hurt accessibility.  The HTML5 spec instructs that [the placeholder attribute should not be used as an alternative to a label](http://dev.w3.org/html5/spec/common-input-element-attributes.html#attr-input-placeholder).

While the adding & removing of placeholder text on field focus has long been accomplished through JavaScript, there is now a [placeholder attribute](http://www.w3.org/TR/html5/common-input-element-attributes.html#attr-input-placeholder) in the HTML5 working draft.  Most modern browsers support the placeholder attribute and will automatically add/replace the placeholder text.  They will also automatically exclude the placeholder from being sent when the form is submitted.  However, versions of Internet Explorer prior to IE10 do not support the attribute.

````html
<input type='text' name='email' placeholder='Email Address'/>
````

### Supporting Older Browsers

```javascript
// A jQuery based placeholder polyfill
$(document).ready(function(){
  function add() {
    if($(this).val() === ''){
      $(this).val($(this).attr('placeholder')).addClass('placeholder');
    }
  }

  function remove() {
    if($(this).val() === $(this).attr('placeholder')){
      $(this).val('').removeClass('placeholder');
    }
  }

  // Create a dummy element for feature detection
  if (!('placeholder' in $('<input>')[0])) {

    // Select the elements that have a placeholder attribute
    $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

    // Remove the placeholder text before the form is submitted
    $('form').submit(function(){
      $(this).find('input[placeholder], textarea[placeholder]').each(remove);
    });
  }
});
````

To enable styling, this script adds a class of 'placeholder' while the placeholder text is being displayed.

### Styling The Placeholder

Since placeholder has yet to be standardized, styles are applied through vendor-specific prefixes.  Even though Opera 11 supports the placeholder attribute, it does not offer any way to style it at this time. It's a good idea to go ahead and specify at least the color property to normalize the color between browsers.  Otherwise, a default style will be provided which will vary from browser to browser.

````css
::-webkit-input-placeholder { color:#999; }
:-moz-placeholder { color:#999; }
:-ms-input-placeholder { color:#999; }
.placeholder { color:#999; } /* from the polyfill */
````

John Catterfeld compiled a nifty <a href='http://blog.ajcw.com/2011/02/styling-the-html5-placeholder/'>list of CSS properties</a> can be applied to placeholders.
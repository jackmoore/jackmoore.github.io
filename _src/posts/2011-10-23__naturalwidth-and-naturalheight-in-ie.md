---
title: NaturalWidth and NaturalHeight in IE
description: Getting the naturalWidth and naturalHeight for an image in any browser.
tags: [JavaScript, jQuery, Internet Explorer]
---

### Actual width and height in modern browsers

Modern browsers (including IE9) provide naturalWidth and naturalHeight properties to IMG elements.  These properties contain the actual, non-modified width and height of the image.

{% highlight javascript %}
  var 
  nWidth = document.getElementById('example').naturalWidth,
  nHeight = document.getElementById('example').naturalHeight;
{% endhighlight %}

### Actual width and height in IE8 and IE7

The naturalWidth and naturalHeight properties are not supported in IE8 or lower.  The height and width property will give the apparent width and height after stylesheet and inline styles, inline width and height attributes, and the display property of the image and the image's parent elements have been applied.  The simplest way to get the unmodified width and height is to create a new image element, and use it's width and height property.

{% highlight javascript %}
  function getNatural (DOMelement) {
    var img = new Image();
    img.src = DOMelement.src;
    return {width: img.width, height: img.height};
  }

  var 
  natural = getNatural(document.getElementById('example')),
  nWidth = natural.width,
  nHeight = natural.height;
{% endhighlight %}

### jQuery naturalWidth() and naturalHeight()

Here is a short jQuery (any version) plugin that adds two methods: naturalWidth() and naturalHeight().  It uses branching to determine if naturalWidth and naturalHeight are supported by the browser.  If supported, the method just becomes a getter for the naturalWidth or naturalHeight property.  If not supported, the method creates a new unstyled image element and returns that element's actual width and height.

{% highlight javascript %}
  // adds .naturalWidth() and .naturalHeight() methods to jQuery
  // for retreaving a normalized naturalWidth and naturalHeight.
  (function($){
    var
    props = ['Width', 'Height'],
    prop;

    while (prop = props.pop()) {
    (function (natural, prop) {
      $.fn[natural] = (natural in new Image()) ? 
      function () {
      return this[0][natural];
      } : 
      function () {
      var 
      node = this[0],
      img,
      value;

      if (node.tagName.toLowerCase() === 'img') {
        img = new Image();
        img.src = node.src,
        value = img[prop];
      }
      return value;
      };
    }('natural' + prop, prop.toLowerCase()));
    }
  }(jQuery));

  // Example usage:
  var 
  nWidth = $('img#example').naturalWidth(),
  nHeight = $('img#example').naturalHeight();
{% endhighlight %}
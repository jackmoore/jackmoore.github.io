---
title: CSS Ribbon Menu
description: Use CSS3 transitions and CSS2 pseudo-elements to create an animated navigation ribbon with minimal markup.
tags: [CSS, HTML5]
---

<iframe class='demo' src='/demo/ribbon.html?reload=3' style='height:130px' frameborder='0'></iframe>

## Browser Support

IE8 and IE9 do not support CSS3 transitions, so the hover state will not be animated for those browsers.  Otherwise it looks and functions the same, which I think is a very acceptable fallback.

## The HTML

```html
<div class='ribbon'>
  <a href='#'><span>Home</span></a>
  <a href='#'><span>About</span></a>
  <a href='#'><span>Services</span></a>
  <a href='#'><span>Contact</span></a>
</div>
```

The forked ends and folds are created with CSS pseudo-elements, allowing for very clean HTML.

## The CSS

### Forked ends

```css
.ribbon:after, .ribbon:before {
  margin-top:0.5em;
  content: "";
  float:left;
  border:1.5em solid #fff;
}

.ribbon:after {
  border-right-color:transparent;
}

.ribbon:before {
  border-left-color:transparent;
}
```

Here the `:before` and `:after` pseudo-elements are used to create empty elements with a thick border. The border has one edge set to transparent.  This leaves the element looking like it had a triangular section removed, creating the forked look.

### Links

```css
.ribbon a:link, .ribbon a:visited { 
  color:#000;
  text-decoration:none;
  float:left;
  height:3.5em;
  overflow:hidden;
}
```

The links and the forked ends are all floated left so that they fit flush against each other.  The hidden overflow hides the folds that are positioned beneath the span elements.

### Animated Folds

```css
.ribbon span {
  background:#fff;
  display:inline-block;
  line-height:3em;
  padding:0 1em;
  margin-top:0.5em;
  position:relative;
  transition: background-color 0.2s, margin-top 0.2s;
}

.ribbon a:hover span {
  background:#FFD204;
  margin-top:0;
}

.ribbon span:before {
  content: "";
  position:absolute;
  top:3em;
  left:0;
  border-right:0.5em solid #9B8651;
  border-bottom:0.5em solid #fff;
}

.ribbon span:after {
  content: "";
  position:absolute;
  top:3em;
  right:0;
  border-left:0.5em solid #9B8651;
  border-bottom:0.5em solid #fff;
}
```

A nifty trick for vertically centering text inside of an element is to set the line-height to be the desired height of the element, and remove any vertical padding. This will keep the height fixed and the text centered, even if the font-face, font-size, or font-weight changes.

The top-margin gives the span space to be animated while staying within the anchor element. The span is given a relative position so that it will be the positioning reference for its absolutely positioned `:before` and `:after` pseudo-elements.

A CSS3 transition animates the transition between the span's normal state and its hover state. Transitions are an experimental feature and are not yet part of the CSS3 specification.  As such, each browser has implemented transitions using their respective vendor prefix. The non-prefixed transition property is used under the assumption that, in the future, the property will be a part of the CSS specification.

The :before and :after pseudo-elements create the folded edges when hovering a link.  They are absolutely positioned underneath the span element, and will normally be hidden due to the anchor element having a hidden overflow.  The pseudo-elements contain only a bottom border and a left or right border. Since the borders are as thick as they are long (0.5 x 0.5) and are adjacent, it creates two triangles for us to apply a color to.  The bottom borders will be the same color as the ribbon, and the left or right borders will have the color of the folded edge.

### See The [Demo](/demo/ribbon.html)
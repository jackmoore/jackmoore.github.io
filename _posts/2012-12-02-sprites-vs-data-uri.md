---
title: Sprites vs. Data URIs
layout: post
meta: Making optimal use of CSS sprites, and data URIs.
tags: [CSS, Development]
published: false
---

## A quick introduction

The general rule is to minize the amount of HTTP requests a visitor will have to make when loading a webpage. Each request carries a small amount of overhead, which can account for a significant amount of the transfer time for small files.  One way to reduce requests is to combine many small images into a single larger image, called a sprite.  This sprite replaces this use of the individual image files in a CSS document.  What part of the spite is displayed is controlled through the setting the background-position in the CSS.  Another approach is to completely eliminate the image request by embedding the image data directly into the stylesheet using a data URI.

## The problem with sprites



## The problem with data URIs

Data URIs are almost a perfect substitution for sprites.  They do not suffer any of the limitations of sprites, and it's easier to write tools to automate replacing files in your CSS with data URIs.

Data URIs suffer none of the limitations that sprites have.

## Suggestions

### 1. Automate the process

### 2. Use a combined approach

I use a combined approach: sprites for images that can be combined, and data URIs for those that can't. 
Due to the limitations of sprites, I would love to use data URIs exclusively for small images. 
I've [experimented]() with that, but there doesn't seem to be a pratical solution at the moment.

### 3. Use :before or :after pseudo elements to crop sprites


### Keep an eye on the SPDY/HTTP2.0 Spec.

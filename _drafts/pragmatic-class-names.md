---
title: Pragmatic class names
layout: post
meta: Looking back on the evolving best practice of how to name classes
tags: [CSS]
---

## Reflecting on CSS Zen Garden

[CSS Zen Garden](http://www.csszengarden.com/) bookmarked the end of presentational HTML era. It was a website launched early 2003 that challenged designers to use only CSS to create a new visual appearance for a single unchanging HTML document.  The site showcased user submitted layouts, demonstrating just how powerful CSS-driven presentation could be.

The inability to edit the HTML to provide additional styling hooks led to stylesheets that were heavily dependent on the markup structure. This worked out fine for Zen Garden, but generates very brittle CSS when dealing with evolving projects.  Many designers came away thinking that this was a best practice for authoring CSS.

Using CSS instead of presentational HTML introduced a separation of concerns between markup and presentation.  This separation was often presented as layers of concerns, with the content (HTML) being the bottom layer to which presentation (CSS) and behavior (JS) layers get applied.  This layering of concerns reinforces the idea that good CSS conforms to markup, rather than the markup co-evolving to provide additional styling hooks. 

Designers were instructed to avoid <em>[classitis](http://books.google.com/books?id=wUGTSdey6TwC&pg=PA184&lpg=PA184&dq=jeffrey+zeldman+classitis&source=bl&ots=bclYNIL3UW&sig=PBk96nV2mgiR4Ky4JxYdqvxCUzQ&hl=en&sa=X&ei=W-8XU4baB8HpoASazYCoDw&ved=0CDkQ6AEwAg#v=onepage&q=jeffrey%20zeldman%20classitis&f=false)</em>, and styling to the markup by using ancestor selectors was one way to achieve that.


## Semantic classes

The W3C took the position that [class names should be semantic](http://www.w3.org/QA/Tips/goodclassnames), and [microformats](http://en.wikipedia.org/wiki/Microformat) emerged in 2004 to standardize the use of specific class names as a way of adding new semantics to HTML without the need for new elements.  Semantic naming meant that class names wouldn't need to be updated when the design changed, just like Zen Garden!

Google supports [a few formats microformats](http://microformats.org/wiki/google-search), but it recommends using [microdata](http://schema.org/) instead.  Microdata is similar to microformats, but relies on properties instead of classes. Outside of a few select microformats, no browser, search engine, or screen reader utilizes class names for meaning.  Classes cannot carry the same semantics as markup because classes don't factor into how content is interpreted. 

## Being pragmatic

The idea that class names need not ever change is not very representative of how markup and CSS co-evolve in real world projects. Semantic naming is a great convention to follow, but saying that all classes should be semantic creates an unnecessary hurdle.  Some utility classes will inherently be presentational, and not naming these classes after their actual purpose places purity over pragmatism.  I feel like this is a lingering over-reaction to the days of presentational HTML.

<blockquote>
	<p>The semantics debate has really gone too far. It is useful as a general principal, but often I see standards aware developers trying to stuff in semantics that never existed in the design. If the design didn't make a distinction between two things visually, why add additional complexity? Classes work much better when we use them to represent visual semantics, rather than keeping them tied to content.</p>
	<footer><cite>— Nicole Sullivan, <a href='http://www.stubbornella.org/content/2011/04/28/our-best-practices-are-killing-us/'>Our best practices are killing us</a></cite></footer>
</blockquote>

<blockquote>
	<p>However, not all semantics need to be content-derived. Class names cannot be “unsemantic”. Whatever names are being used: they have meaning, they have purpose. Class name semantics can be different to those of HTML elements.</p>
	<footer><cite>— Nicolas Gallagher, <a href='http://nicolasgallagher.com/about-html-semantics-front-end-architecture/'>About HTML semantics and front-end architecture</a></cite></footer>
</blockquote>

<blockquote>
	<p>Calling a presentational pattern by a non-presentational name can add confusion where none is necessary.</p>
	<footer><cite>— Philip Walton, <a href='http://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/'>Defending presentational class names</a></footer>
</blockquote>

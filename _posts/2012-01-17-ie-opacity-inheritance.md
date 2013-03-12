---
title: Fixing IE's Opacity Inheritance
layout: post
meta: Child elements ignore the parent's opacity in Internet Explorer.
tags: [Internet Explorer, CSS]
---

### In Internet Explorer 7, 8, 9, non-static child elements do not inherit the opacity of the parent.

<div style='opacity:0.5; filter: alpha(opacity=50); padding:15px; height:90px; border:1px solid #999; margin-bottom:15px;'>
	All of this text should have a 50% opacity...
	<div style='position:relative;'>But this line displays at full opacity in IE8 and IE7.</div>
	<div style='position:absolute;'>And this line displays at full opacity in IE9, IE8 and IE7.</div>
</div>

	<div style='opacity: 0.5; filter: alpha(opacity=50);'>
		All of this text should have a 50% opacity...
		<div style='position: relative'>But this line displays at full opacity in IE7 and IE8.</div>
		<div style='position: absolute'>And this line displays at full opacity in IE7, IE8 and IE9.</div>
	</div>

This bug is triggered when the child element has any position other than static, regardless of the parent's position value (static, fixed, absolute, or relative). IE9 only has a problem when the child element has a fixed or absolute position, and the parent element has a static position. Maddeningly, IE7 and IE8 have other opacity related bugs which may derail alternative approaches.

### Workarounds

* IE9: Give the parent a non-static position.
* IE8: Have the child inherit the filter style.
* IE7: Have the child inherit the filter style and give the parent a non-static position.

<div style='opacity:0.5; filter: alpha(opacity=50); padding:15px; height:90px; border:1px solid #999; margin-bottom:15px; position:relative'>
	All of this text has 50% opacity...
	<div style='position:relative; filter: inherit;'>Including this line.</div>
	<div style='position:absolute; filter: inherit;'>And this line.</div>
</div>

	<div style='opacity: 0.5; filter: alpha(opacity=50); position: relative;'>
		All of this text has 50% opacity...
		<div style='position: relative; filter: inherit;'>Including this line.</div>
		<div style='position: absolute; filter: inherit;'>And this line.</div>
	</div>

Alternatively, a new alpha filter could be set on the child elements.  This could be useful in situations where inheriting the parent's filters is undesirable.

	<div style='opacity: 0.5; filter: alpha(opacity=50); position: relative'>
		All of this text has 50% opacity...
		<div style='position: relative; filter: alpha(opacity=50);'>Including this line.</div>
		<div style='position: absolute; filter: alpha(opacity=50);'>And this line.</div>
	</div>

A caveat to having a filter on the child element is that IE9 will apply both the child's filter and the parent's filter and/or opacity.  The examples above effectively have a 25% opacity in IE9 (50% of 50%).  Use conditional CSS to target IE8 and lower when setting the child's alpha filter.


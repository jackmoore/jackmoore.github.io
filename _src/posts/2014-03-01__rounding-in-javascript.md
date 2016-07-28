---
title: Rounding Decimals in JavaScript
description: A more accurate way to round with decimals
tags: [JavaScript]
---

## Why it's complicated

JavaScript's Math object provides a method for rounding to whole numbers.  If we want to round to a set number of decimal places, then we have to handle that ourselves.  This post doesn't get into the details of [floating-point arithmetic](http://floating-point-gui.de/), but the short of it is most programming languages use a binary floating-point representation which can only approximate many decimal fractions.  This results in rounding errors for the most common approaches to rounding in JavaScript.

## Rounding Errors

The most common solutions for rounding to a decimal place is to either use `Number.prototype.toFixed()`, or multiply the float by some power of 10 in order to leverage `Math.round()`.  Both of these work, except sometimes a decimal of 5 is rounded down instead of up.

```javascript
Number((1.005).toFixed(2)); // 1 instead of 1.01
```
```javascript
Math.round(1.005*100)/100; // 1 instead of 1.01
```

## A Better Solution

The rounding problem can be avoided by using numbers represented in exponential notation:

```javascript
Number(Math.round(1.005+'e2')+'e-2'); // 1.01
```

And to abstract that into something more usable:

```javascript
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

round(1.005, 2); // 1.01
```
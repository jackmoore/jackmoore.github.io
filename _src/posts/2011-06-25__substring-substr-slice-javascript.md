---
title: 'JavaScript: Slice, Substring, or Substr?'
description: A comparison of substring methods.
tags: [JavaScript]
---

In JavaScript, substrings are primarily extracted through one of following String methods:
[slice](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/slice), 
[substring](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substring), 
[substr](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substr).

```javascript
// slice 
// syntax: string.slice(start [, stop])
"Good news, everyone!".slice(5,9); 
// 'news'

// substring 
// syntax: string.substring(start [, stop])
"Good news, everyone!".substring(5,9); 
// 'news'

// substr
// syntax: string.substr(start [, length])
"Good news, everyone!".substr(5,4); 
// 'news'
```

All three of these methods take in a start index and an optional stop index (or length) parameter, but they differ in some important ways:

* substr can give inconsistent results.  Modern browers allow using a negative start index to indicate the number of characters from the end of the string, but IE8 and lower treat a negative start index as 0.
* substring's parameters are reversable, as it will always use its smallest parameter value as the start index and largest value as the stop index.  substring will treat a negative start index as 0.
* slice extracts from the end of the string if the starting index is negative.

### Negative start index

```javascript
"Good news, everyone!".substring(-4);
// "Good news, everyone!"

"Good news, everyone!".substr(-4);
// "one!" modern browsers, including IE9
// "Good news, everyone!" IE8 and lower

"Good news, everyone!".slice(-4); 
// "one!"
```

Since all three methods have [roughly equivalent performance](http://jsperf.com/substring-extraction-methods-substring-substr-slice), my preference is to use slice.  It supports extracting from the end of the string and I feel that returning an empty string when start index &gt; stop follows the [principle of least surprise](http://en.wikipedia.org/wiki/Principle_of_least_astonishment) better than substring's swapping of parameters. I avoid substr because of the browser inconsistency.
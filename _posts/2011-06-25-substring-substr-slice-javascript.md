---
title: 'JavaScript: Slice, Substring, or Substr?'
layout: post
meta: A comparison of substring methods.
tags: [JavaScript]
---

In JavaScript, substrings are primarily extracted through one of following String methods:
[slice](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/slice), 
[substring](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substring), 
[substr](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substr).

```
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

* substr can give inconsistent results.
If the starting index is negative, substr will either use 0 as the starting index (IE<9), or extract from the end of the string (IE>=9 and other browsers).
* substring swaps it's parameters if the starting index is greater than the stopping index (start &gt; stop).
* substring replaces a negative starting index with 0.
* slice extracts from the end of the string if the starting index is negative.

### Negative start index

```
"Good news, everyone!".substring(-4);
// "Good news, everyone!"

"Good news, everyone!".substr(-4);
// "one!" in IE>=9 and other bowsers
// "Good news, everyone!" in IE<9

"Good news, everyone!".slice(-4); 
// "one!"
```

Since all three methods have [roughly equivalent performance](http://jsperf.com/substring-extraction-methods-substring-substr-slice), my preference is to use slice.  It supports extracting from the end of the string and I feel that returning an empty string when start index &gt; stop follows the [principle of least surprise](http://en.wikipedia.org/wiki/Principle_of_least_astonishment) better than substring's swapping of parameters. I avoid substr because of the browser inconsistency.
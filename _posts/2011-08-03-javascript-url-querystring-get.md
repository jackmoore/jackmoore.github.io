---
title: 'JavaScript: working with URLs and GET'
layout: post
meta: A short script to parse URLs, serialize GET parameters, and unserialize querystrings.
tags: [JavaScript]
---

I am frequently asked about how to deal with JavaScript that depends on parameters in a URL.  This topic has been exhaustively covered so there isn't anything new here.  MooTools, Prototype, and jQuery users should know that those libraries already have (better) serialize methods, such as jQuery's <a href='http://api.jquery.com/jQuery.param/'>param</a>.  Ben Alman wrote a much more sophisticated unserialize method called <a href='http://benalman.com/code/projects/jquery-bbq/examples/deparam/'>deparam</a> that is available as a jQuery plugin. However, I still felt like writing my own and hopefully someone will find it useful.

### Methods

<table>
  <tr>
    <td>URL.serialize(parameters)</td>
    <td>Accepts an object of parameters and returns a querystring.</td>
  </tr>
  <tr>
    <td>URL.unserialize(querystring)</td>
    <td>Accepts a querystring and returns an object of parameters.</td>
  </tr>
  <tr>
    <td>URL.parse(url)</td>
    <td>Accept any valid URL and breaks it into it's components, such as host, hash (fragment), and search (querystring).</td>
  </tr>
</table>

### Usage

````javascript
URL.serialize({name:'Tom', age:50, hobby:'fishing & gardening'});
//  returns name=Tom&age=50&hobby=fishing%20%26%20gardening

URL.unserialize('name=Tom&age=50&hobby=fishing%20%26%20gardening');
//  returns {name:"Tom", age:"50", hobby:"fishing & gardening"}

URL.parse('http://www.example.com:8080/blog/index.php?pageID=2&query="parts"#top');
//  returns
//  {
//    file: "index.php",
//    hash: "#top",
//    host: "www.example.com:8080",
//    hostname: "www.example.com",
//    href: "http://www.example.com:8080/blog/index.php?pageID=2&query="parts"#top",
//    params: {pageID:"2", query:"parts"},
//    pathname: "/blog/index.php",
//    port: "8080",
//    protocol: "http:",
//    search: "?pageID=2&query=%22parts%22"
//  }
````

### Source

````javascript
var URL = (function (a) {
  return {
    // create a querystring from a params object
    serialize: function (params) { 
      var key, query = [];
      for (key in params) {
        query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
      }
      return query.join('&');
    },
    
    // create a params object from a querystring
    unserialize: function (query) {
      var pair, params = {};
      query = query.replace(/^\?/, '').split(/&/);
      for (pair in query) {
        pair = query[pair].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return params;
    },
    
    parse: function (url) {
      a.href = url;
      return {
        // native anchor properties
        hash: a.hash,
        host: a.host,
        hostname: a.hostname,
        href: url,
        pathname: a.pathname,
        port: a.port,
        protocol: a.protocol,
        search: a.search,
        // added properties
        file: a.pathname.split('/').pop(),
        params: URL.unserialize(a.search)
      };
    }
  };
}(document.createElement('a')));
````
var build = require('./build');
var watch = require ('watch');
var static = require('node-static');
var server = new static.Server('../');

build();

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        server.serve(request, response);
    }).resume();
}).listen(3333);

watch.watchTree('./', {
	ignoreDirectoryPattern: /node_modules/,
}, function (f, curr, prev) {
	if (typeof f == "object" && prev === null && curr === null) {
		build();
	} else if (prev === null) {
		console.log(f+' is a new file');
		build();
	} else if (curr.nlink === 0) {
		console.log(f+' was removed');
		build();
	} else {
		console.log(f+' was changed');
		build();
	}
});
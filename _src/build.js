var path = require('path');
var marked = require('marked');
var fm = require('front-matter');
var fs = require('fs');
var rmdir = require('rimraf');
var mkdirp = require('mkdirp');

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

require("6to5/register");

var tmpl = {
	post: require('./templates/post.js'),
	basic: require('./templates/basic.js'),
	archive: require('./templates/archive.js'),
}

// Clean posts folder
rmdir.sync('../notes');
fs.mkdirSync('../notes');

var posts = fs.readdirSync('posts')
	.filter(function(el){ return el[0] !== '.' })
	.map(function(el){
		var split = path.basename(el).split('__');
		var data = fm(fs.readFileSync(path.join('posts', el), 'utf8'));

		data.attributes.content = marked(data.body);
		data.attributes.date = split[0];
		data.attributes.permalink = '/notes/'+path.basename(split[1], '.md')+'/';
		data.dir = '../notes/'+path.basename(split[1], '.md');

		return data;
	}).sort(function(a,b){
		return a.attributes.date < b.attributes.date ? 1 : -1;
	});

posts.forEach(function(el){
	fs.mkdirSync(el.dir);
	fs.writeFileSync(path.join(el.dir, 'index.html'), tmpl.post.render({
		page: el.attributes,
		posts: posts,
	}));
});

var pages = fs.readdirSync('pages')
	.filter(function(el){ return el[0] !== '.' })
	.forEach(function(el){
		var data = fm(fs.readFileSync(path.join('pages', el), 'utf8'));
		var dir = '..'+data.attributes.permalink;

		data.attributes.content = marked(data.body);
		mkdirp.sync(dir);

		fs.writeFileSync(path.join(dir, 'index.html'), tmpl[data.attributes.template].render({
			page: data.attributes,
			posts: posts,
		}));
	});
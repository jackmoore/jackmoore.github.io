module.exports = {
	render(props) {
		var postList = props.posts.map((el)=>{
			return `
				<li><a href="${el.attributes.permalink}">${el.attributes.title}</a>
			`;	
		});

		var tags = {};

		props.posts.forEach((el)=>{
			if (!el.attributes.tags) return;
			el.attributes.tags.forEach(function(key){
				if (tags[key] == null) {
					tags[key] = 1;
				} else {
					tags[key]++;
				}
			});
		});

		var tagList = Object.keys(tags).map((key)=>{
			var tagClass = 'tag-'+key.replace(' ','-').toLowerCase();

			return `
				<li>
					<a href='/notes/#${tagClass}' class='${tagClass}'>${key} <span>x${tags[key]}</span></a>
				</li>
			`;
		});

		return `
<!doctype html public '(╯°□°）╯︵ 8ƎI'>
<html lang=en class='${props.page.class || ''}'>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<link rel='stylesheet' href='//fonts.googleapis.com/css?family=Open+Sans:400,600&amp;subset=latin'>
	<link rel='stylesheet' href='/css/style.css'>
	<link rel='stylesheet' href='/css/github.css'>
	<!--[if lt IE 9]><script src='/js/html5.js'></script><![endif]-->
	<title>${props.page.title}</title>
	<header>
		<a class='me' rel='author' href='/'>Jack Moore</a>
		<a class='twitter' href='http://twitter.com/jacklmoore' rel='me'><i class='icon-twitter'></i></a>
		<a class='github' href='http://github.com/jackmoore' rel='me'>Github</a>
		<nav>
			<a href='/notes'><span>Archive</span></a>
		</nav>
	</header>
	<div class='main' role='main'>
		<article>
			${props.page.content}
		</article>
		<aside>
			<h3>Github Repos</h3>
			<ul>
				<li><a href='/colorbox'>Colorbox</a> &raquo; jQuery lightbox. Need the <a href='/colorbox/faq/'>FAQ</a>?
				<li><a href='/autosize'>Autosize</a> &raquo; Automatically resize textarea height
				<li><a href='/zoom'>Zoom</a> &raquo; jQuery plugin to enlarge images
				<li><a href='/wheelzoom'>Wheelzoom</a> &raquo; enlarge images on mousewheel
			</ul>
			<div class='recent-posts'>
				<h3>Blog Posts</h3>
				<ul>
					${postList.join('')}
				</ul>
			</div>
			<h3>Tags</h3>
			<ul class='tags'>
				${tagList.join('')}
			</ul>
		</aside>
	</div>
	<script src="/js/main.js"></script>
		`;
	}
}
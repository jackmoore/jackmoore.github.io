var moment = require('moment');
var basic = require('./basic.js');

module.exports = {
	render(props) {

		var postList = props.posts.map((el)=>{
				var tagClasses = el.attributes.tags ? el.attributes.tags.map((tag)=>'tag-'+tag.replace(' ','-').toLowerCase()) : '';

				return `
					<div class='archive__item ${tagClasses.join(' ')}'>
						<p class='date'>${moment(el.attributes.date).format('MMM. D, YYYY')}
						<h3><a href='${el.attributes.permalink}'>${el.attributes.title}</a></h3>
					</div>
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
					<a href='#${tagClass}' class='${tagClass}'>${key} <span>x${tags[key]}</span></a>
				</li>
			`;
		});

		props.page.content = `
			<h1>Archive</h1>
			<ul class='tags'>
				<li><a href='#tag-all' class='tag-all' data-active='true'>All</a>
				${tagList.join('')}
			</ul>
			${postList.join('')}
		`;

		return basic.render(props);
	}
}
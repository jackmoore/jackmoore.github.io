var moment = require('moment');
var basic = require('./basic.js');

module.exports = {
	render(props) {
		var date = props.page.date ? `<p class='date'><span class='icon-calendar icon--inline'></span>`+(moment(props.page.date).format('MMMM Do, YYYY'))+`</p>` : '';
		var description = props.page.description ? `<p class='description'>${props.page.description}</p>` : '';

		props.page.content = `
			<h1>${props.page.title}</h1>
			${description}
			<hr>
			${date}
			${props.page.content}
			<hr>
			<h2>Hey,</h2>
			<p>Follow me on <a href="http://twitter.com/jacklmoore" rel='me'>Twitter</a> and <a href="http://github.com/jackmoore" rel='me'>Github</a>, that's where I'm most active these days.  I welcome email (<span class='email'></span>), but I'm afraid I no longer have time to answer personal requests for help regarding my plugins or posts.  Thanks!</p>
			<p>
			<iframe src="http://ghbtns.com/github-btn.html?user=jackmoore&amp;type=follow&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="170" height="20"></iframe>
			<a href="https://twitter.com/jacklmoore" class="twitter-follow-button" data-show-count="true">Follow @jacklmoore</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
			</p>
		`;
		return basic.render(props);
	}
}
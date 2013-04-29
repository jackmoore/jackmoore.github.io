if (typeof window.console === 'object' && typeof window.console.log === 'function') {
	window.console.log('Salutations!');
}


// Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

window.ga('create', 'UA-40201913-1', 'jacklmoore.com');
window.ga('send', 'pageview');


// Error logging
window.onerror = function(msg, url, line){
	window.ga('send', 'event', {
		'eventCategory': 'Errors',
		'eventAction': url+':'+line+' Error: '+msg+' '
	});
};


if (typeof document.addEventListener === 'function') {

	// Download logging
	document.addEventListener('click', function(e) {
		if(e.target && e.target.href && /\.zip$/i.test(e.target.href)) {
			window.ga('send', 'event', {
				'eventCategory': 'Downloads',
				'eventAction': e.target.href
			});
		}
	});


	// Filter by tag for archive page
	(function() {
		var items = document.querySelectorAll('.archive__item');
		var tags = document.querySelectorAll('.tags a');

		if (!items.length) { return; }

		function filter() {
			var selector = /^#tag-/.test(location.hash) ? location.hash.replace('#', '.') : false;

			if (selector) {
				[].forEach.call(tags, function(i){
					i.removeAttribute('data-active');
				});

				[].forEach.call(document.querySelectorAll(selector), function(i) {
					i.setAttribute('data-active', true);
				});

				if (selector === '.tag-all') {
					[].forEach.call(items, function(i){
						i.style.display = 'block';
					});
				} else {
					[].forEach.call(items, function(i){
						i.style.display = 'none';
					});

					[].forEach.call(document.querySelectorAll(selector), function(i){
						i.style.display = 'block';
					});
				}
			}

			return false;
		}

		window.addEventListener('hashchange', filter);

		filter();
	}());
}
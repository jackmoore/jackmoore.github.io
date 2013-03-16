// Analytics
(function() {
	var t = 'script',
		g = document.createElement(t),
		s = document.getElementsByTagName(t)[0];

	window._gaq = [['_setAccount', 'UA-7069470-2'], ['_trackPageview']];

	g.src = '//www.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g, s);

	// Error logging
	window.onerror = function(msg, url, line){
		window._gaq.push(['_trackEvent', 'Errors', url+':'+line+' Error: '+msg+' ']);
	};

	// Download Tracking
	$(document).on('click', 'a[href$=".zip"]', function(){
		window._gaq.push(['_trackEvent', 'Downloads', this.href]);
	});
})();


if (typeof window.console === 'object' && typeof window.console.log === 'function') {
	window.console.log('Salutations!');
}


function placeholderDemo() {
	function add() {
		if(!$(this).val()){
			$(this).val($(this).attr('placeholder')).addClass('placeholder');
		}
	}

	function remove() {
		if($(this).val() === $(this).attr('placeholder')){
			$(this).val('').removeClass('placeholder');
		}
	}

	// Create a dummy element for feature detection
	if (!('placeholder' in $('<input>')[0])) {

		// Select the elements that have a placeholder attribute
		$('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

		// Remove the placeholder text before the form is submitted
		$('form').submit(function(){
			$(this).find('input[placeholder], textarea[placeholder]').each(remove);
		});
	}
}

function filterByTag() {
	if (!$('.archive').length) { return; }

	function filter() {
		var selector = /^#tag-/.test(location.hash) ? location.hash.replace('#', '.') : false;

		if (selector) {
			$('.tags a')
				.removeClass('is-active')
				.filter(selector)
				.addClass('is-active');

			if (selector === '.tag-all') {
				$('.archive__item').show();
			} else {
				$('.archive__item').hide().filter(selector).show();
			}
		}

		return false;
	}

	$(window).on('hashchange', filter);

	filter();
}

function autosizeDemo() {
	if (!$.fn.autosize) { return; }
	$('#ta1').autosize();
	$('#ta2').autosize({append: "\n"});
}

function zoomDemo() {
	if (!$.fn.zoom) { return; }
	$('#ex1').zoom();
	$('#ex2').zoom({ on:'grab' });
}

$(document).ready(function(){
	placeholderDemo();
	autosizeDemo();
	zoomDemo();
	filterByTag();
});

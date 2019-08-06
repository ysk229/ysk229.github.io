/* eslint-disable */
var customSearch;
(function ($) {

	"use strict";
	var scrollCorrection = 70; // (header height = 50px) + (gap = 20px)
	function scrolltoElement(elem, correction) {
		correction = correction || scrollCorrection;
		var $elem = elem.href ? $(elem.getAttribute('href')) : $(elem);
		$('html, body').animate({ 'scrollTop': $elem.offset().top - correction, 'scrollLeft': 0 }, 400);
	};

	function setHeader() {
		if (!window.subData) return;
		var $wrapper = $('header .wrapper');
		var $comment = $('.s-comment', $wrapper);
		var $toc = $('.s-toc', $wrapper);
		var $top = $('.s-top', $wrapper);

		$wrapper.find('.nav-sub .logo').text(window.subData.title);
		var pos = document.body.scrollTop;
		$(document, window).scroll(function () {
			var scrollTop = $(window).scrollTop();
			var del = scrollTop - pos;
			if (del >= 20) {
				pos = scrollTop;
				$wrapper.addClass('sub');
			} else if (del <= -20) {
				pos = scrollTop;
				$wrapper.removeClass('sub');
			}
		});
		// bind events to every btn
		var $commentTarget = $('#comments');
		if ($commentTarget.length) {
			$comment.click(function (e) { e.preventDefault(); e.stopPropagation(); scrolltoElement($commentTarget); });
		} else $comment.remove();

		var $tocTarget = $('.toc-wrapper');
		if ($tocTarget.length && $tocTarget.children().length) {
			$toc.click(function (e) { e.stopPropagation(); $tocTarget.toggleClass('active'); });
		} else $toc.remove();

		$top.click(function () { scrolltoElement(document.body); });

	}
	function setHeaderMenu() {
		var $headerMenu = $('header .menu');
		var $underline = $headerMenu.find('.underline');
		function setUnderline($item, transition) {
			$item = $item || $headerMenu.find('li a.active');//get instant
			transition = transition === undefined ? true : !!transition;
			if (!transition) $underline.addClass('disable-trans');
			if ($item && $item.length) {
				$item.addClass('active').siblings().removeClass('active');
				$underline.css({
					left: $item.position().left,
					width: $item.innerWidth()
				});
			} else {
				$underline.css({
					left: 0,
					width: 0
				});
			}
			if (!transition) {
				setTimeout(function () { $underline.removeClass('disable-trans') }, 0);//get into the queue.
			}
		}
		$headerMenu.on('mouseenter', 'li', function (e) {
			setUnderline($(e.currentTarget));
		});
		$headerMenu.on('mouseout', function () {
			setUnderline();
		});
		//set current active nav
		var $active_link = null;
		if (location.pathname === '/' || location.pathname.startsWith('/page/')) {
			$active_link = $('.nav-home', $headerMenu);
		} else {
			var name = location.pathname.match(/\/(.*?)\//);
			if (name.length > 1) {
				$active_link = $('.nav-' + name[1], $headerMenu);
			}
		}
		setUnderline($active_link, false);
	}
	function setHeaderMenuPhone() {
		var $switcher = $('.l_header .switcher .s-menu');
		$switcher.click(function (e) {
			e.stopPropagation();
			$('body').toggleClass('z_menu-open');
			$switcher.toggleClass('active');
		});
		$(document).click(function (e) {
			$('body').removeClass('z_menu-open');
			$switcher.removeClass('active');
		});
	}
	function setHeaderSearch() {
		var $switcher = $('.l_header .switcher .s-search');
		var $header = $('.l_header');
		var $search = $('.l_header .m_search');
		if ($switcher.length === 0) return;
		$switcher.click(function (e) {
			e.stopPropagation();
			$header.toggleClass('z_search-open');
			$search.find('input').focus();
		});
		$(document).click(function (e) {
			$header.removeClass('z_search-open');
		});
		$search.click(function (e) {
			e.stopPropagation();
		})
	}
	function setWaves() {
		Waves.attach('.flat-btn', ['waves-button']);
		Waves.attach('.float-btn', ['waves-button', 'waves-float']);
		Waves.attach('.float-btn-light', ['waves-button', 'waves-float', 'waves-light']);
		Waves.attach('.flat-box', ['waves-block']);
		Waves.attach('.float-box', ['waves-block', 'waves-float']);
		Waves.attach('.waves-image');
		Waves.init();
	}
	function setScrollReveal() {
		const $reveal = $('.reveal');
		if ($reveal.length === 0) return;
		const sr = ScrollReveal({ distance: 0 });
		sr.reveal('.reveal');
	}
	function setTocToggle() {
		var $toc = $('.toc-wrapper');
		if ($toc.length === 0) return;
		$toc.click(function (e) { e.stopPropagation(); $toc.addClass('active'); });
		$(document).click(function () { $toc.removeClass('active'); });

		// $toc.on('click', 'a', function(e) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	scrolltoElement(e.target.tagName.toLowerCase === 'a' ? e.target : e.target.parentElement);
		// });

		// var liElements = Array.from($toc.find('li a'));
		// //function animate above will convert float to int.
		// var getAnchor = function() { liElements.map(function (elem) { return Math.floor($(elem.getAttribute('href')).offset().top - scrollCorrection); }); }

		// var anchor = getAnchor();
		// var scrollListener = function() {
		// 	var scrollTop = $('html').scrollTop() || $('body').scrollTop();
		// 	if (!anchor) return;
		// 	//binary search.
		// 	var l = 0, r = anchor.length - 1, mid;
		// 	while (l < r) {
		// 		mid = (l + r + 1) >> 1;
		// 		if (anchor[mid] === scrollTop) l = r = mid;
		// 		else if (anchor[mid] < scrollTop) l = mid;
		// 		else r = mid - 1;
		// 	}
		// 	$(liElements).removeClass('active').eq(l).addClass('active');
		// }
		// $(window)
		// 	.resize(function() {
		// 		anchor = getAnchor();
		// 		scrollListener();
		// 	})
		// 	.scroll(function() {
		// 		scrollListener()
		// 	});
		// scrollListener();
	}

	$(function () {
		setHeader();
		setHeaderMenu();
		setHeaderMenuPhone();
		setHeaderSearch();
		// setWaves();
		// setScrollReveal();
		setTocToggle();
		$('table').wrap('<div class="table-wrap"></div');


	});


	$("body").niceScroll({
		cursorcolor: "#517edc",
		// cursorcolor:		"#2ecc71",
		cursorwidth: "12px",
		cursorborder: "0px solid #000",
		scrollspeed: 60,
		autohidemode: true,
		background: '#ddd',
		hidecursordelay: 400,
		cursorfixedheight: false,
		cursorminheight: 20,
		enablekeyboard: true,
		horizrailenabled: true,
		bouncescroll: false,
		smoothscroll: true,
		iframeautoresize: true,
		touchbehavior: false,
		zindex: 999
	});
	$(".article-entry pre").niceScroll({
		cursorcolor: "#ffffff", cursorwidth: "6px",
		cursorborder: "0px solid #000",
	});

	$('.js-toc').length != 0 && tocbot.init({
		// Where to render the table of contents.
		tocSelector: '.js-toc',
		// Where to grab the headings to build the table of contents.
		contentSelector: '.post',
		// Which headings to grab inside of the contentSelector element.
		headingSelector: 'h1, h2, h3',

		scrollSmooth: true,
		//平滑滚动持续时间。
		scrollSmoothDuration: 420,
	});

})(jQuery);
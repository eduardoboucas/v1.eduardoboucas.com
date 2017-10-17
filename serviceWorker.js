importScripts('js/vendor/serviceworker-cache-polyfill.js');

var cacheName = 'eduardoboucas.com-cache-v3';
var filesToCache = [
    // Stylesheets
    '/css/main.css',

    // Pages and assets
    
    '/404.html',
    '/about.html',
    '/findme.html',
    '/home.html',
    '/blog/',
    '/',
    '/portfolio.html',
    '/blog/tags.html',
    '/blog/2016/06/18/viewport-sized-typography-with-minimum-and-maximum-sizes.html',
    '/blog/2016/06/29/exporting-breakpoints-from-css-to-javascript-with-include-media.html',
    '/assets/images/glitch.png',
	'/assets/images/drawing.png',  
	'/assets/images/bust.png',
	'/assets/images/background.gif',

	// Portfolio pages
    '/portfolio/austin.html',
    '/portfolio/aveda.html',
    '/portfolio/canon.html',
    '/portfolio/hyundai.html',
    '/portfolio/include-media.html',
    '/portfolio/lazyboy.html',
    '/portfolio/mercedes.html',
    '/portfolio/monocle.html',
    '/portfolio/monoclecafe.html',
    '/portfolio/monoclespring2014.html',
    '/portfolio/monocleworldcup.html',
    '/portfolio/scope.html',
        

    // JS files, Portfolio assets and main video
	'/assets/images/portfolio/screenshots/austin.jpg',
	'/assets/images/portfolio/screenshots/aveda.jpg',
	'/assets/images/portfolio/screenshots/canon.jpg',
	'/assets/images/portfolio/screenshots/hyundai.jpg',
	'/assets/images/portfolio/screenshots/include-media.jpg',
	'/assets/images/portfolio/screenshots/lazyboy.jpg',
	'/assets/images/portfolio/screenshots/mercedes.jpg',
	'/assets/images/portfolio/screenshots/monocle.jpg',
	'/assets/images/portfolio/screenshots/monoclecafe.jpg',
	'/assets/images/portfolio/screenshots/monoclespring2014.jpg',
	'/assets/images/portfolio/screenshots/monocleworldcup.jpg',
	'/assets/images/portfolio/screenshots/scope.jpg',
	'/assets/images/portfolio/thumbnails/austin.jpg',
	'/assets/images/portfolio/thumbnails/aveda.jpg',
	'/assets/images/portfolio/thumbnails/canon.jpg',
	'/assets/images/portfolio/thumbnails/hyundai.jpg',
	'/assets/images/portfolio/thumbnails/include-media.jpg',
	'/assets/images/portfolio/thumbnails/lazyboy.jpg',
	'/assets/images/portfolio/thumbnails/mercedes.jpg',
	'/assets/images/portfolio/thumbnails/monocle.jpg',
	'/assets/images/portfolio/thumbnails/monoclecafe.jpg',
	'/assets/images/portfolio/thumbnails/monoclespring2014.jpg',
	'/assets/images/portfolio/thumbnails/monocleworldcup.jpg',
	'/assets/images/portfolio/thumbnails/scope.jpg',
	'/js/VideoLooper.js',
	'/js/app.js',
	'/js/blog.js',
	'/js/main.js',
	'/js/router.js',
	'/js/text.js',
	'/js/vendor/backbone-min.js',
	'/js/vendor/jekyll-search.js',
	'/js/vendor/jquery.min.js',
	'/js/vendor/modernizr.min.js',
	'/js/vendor/require.min.js',
	'/js/vendor/serviceworker-cache-polyfill.js',
	'/js/vendor/spinner.min.js',
	'/js/vendor/underscore-min.js',
	'/js/views/index.js',
	'/js/views/page.js',
	

	// Blog posts
	'/feeds/search.json',
    '/blog/2015/08/17/creating-a-bemit-grid-system-with-include-media.html',
	'/blog/2015/07/27/generating-alternative-style-sheets-for-browsers-without-media.html',
	'/blog/2015/06/29/exporting-breakpoints-from-css-to-javascript-with-include-media.html',
	'/blog/2015/06/18/viewport-sized-typography-with-minimum-and-maximum-sizes.html',
	'/blog/2015/06/08/include-media-v1-3-released.html',
	'/blog/2015/06/04/supercharging-jekyll-with-a-serviceworker.html',
	'/blog/2015/05/21/an-introduction-to-static-site-generators.html',
	'/blog/2015/05/20/include-media-v1-2-released.html',
	'/blog/2015/05/11/rethinking-the-commenting-system-for-my-jekyll-site.html',
	'/blog/2015/04/28/sharing-jekyll-posts-on-social-media-using-front-matter-and-ifttt.html',
	'/blog/2015/04/27/bem-wrappers-and-nesting-and-why-i-love-twitter.html',
	'/blog/2015/04/21/thoughts-on-an-api-first-wordpress.html',
	'/blog/2015/04/20/google-news-and-sponsored-content.html',
	'/blog/2015/03/22/what-bem-did-to-my-css-specificity.html',
	'/blog/2015/03/19/rapid-deployment-with-sass.html',
	'/blog/2015/02/12/battling-with-ie8-html5-shiv-and-svg.html',
	'/blog/2015/02/01/writing-media-queries-for-retina-devices-with-include-media.html',
	'/blog/2015/01/22/a-cautious-and-calculated-venture-into-flexbox.html',
	'/blog/2015/01/13/experimenting-with-sass-and-grids.html',
	'/blog/2015/01/05/write-simple-elegant-and-maintainable-media-queries-with-sass.html',
	'/blog/2014/12/30/approaches-to-media-queries-in-sass.html',
	'/blog/2014/12/14/building-a-bespoke-commenting-system-for-a-static-site.html',
	'/blog/2014/12/07/including-and-managing-images-in-jekyll.html',
	'/blog/2014/12/04/is-linkedin-ignoring-your-open-graph-meta-tags.html',
	'/blog/2014/11/30/collapsing-code-snippets-on-mobile-devices.html',
	'/blog/2014/11/20/thoughts-on-serving-and-monitoring-a-feed.html',
	'/blog/2014/11/16/creating-a-tags-page-in-jekyll.html',
	'/blog/2014/11/10/adding-ajax-pagination-to-jekyll.html',
	'/blog/2014/10/29/how-i-write-media-queries-in-sass.html',
	'/blog/2014/10/25/how-i-used-jekyll-on-my-backbonejs-website.html',
	'/blog/2014/10/09/the-story-behind-my-website.html',
	
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);

    if (requestUrl.host == 'fonts.gstatic.com') {
        event.respondWith(
            caches.open('eduardoboucas.com-fonts')
                .then(function (cache) {
                    return cache.match(event.request).then(function (match) {
                        if (match) {
                            console.log('[*] Serving cached font: ' + event.request.url);

                            return match;
                        }

                        return fetch(event.request).then(function (response) {
                            cache.put(event.request, response.clone());
                            console.log('[*] Adding font to cache: ' + event.request.url);

                            return response;
                        });
                    });
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function(match) {
                    if (match) {
                        console.log('* [Serving cached]: ' + event.request.url);
                        return match;
                    }

                    // Redirecting /blog to /blog/index.html
                    if ((requestUrl.pathname == '/blog') || (requestUrl.pathname == '/blog/')) {
                        return fetch('/blog/index.html');
                    }

                    console.log('* [Fetching]: ' + event.request.url);
                    return fetch(event.request);
                }
            )
        );
    }
});
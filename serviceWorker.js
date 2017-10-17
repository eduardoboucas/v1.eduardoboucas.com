---
layout: null
---
importScripts('js/vendor/serviceworker-cache-polyfill.js');

var cacheName = 'eduardoboucas.com-cache-v3';
var filesToCache = [
    // Stylesheets
    '/css/main.css',

    // Pages and assets
    {% for page in site.html_pages %}
    '{{ page.url }}',{% endfor %}
    '/assets/images/glitch.png',
	'/assets/images/drawing.png',  
	'/assets/images/bust.png',
	'/assets/images/background.gif',

	// Portfolio pages
    {% for project in site.portfolio %}'{{ project.url }}',
    {% endfor %}    

    // JS files, Portfolio assets and main video
	{% for file in site.static_files %}{% if file.extname == '.js' or file.path contains '/portfolio/screenshots' or file.path contains '/portfolio/thumbnails' %}'{{ file.path }}',
	{% endif %}{% endfor %}

	// Blog posts
	'/feeds/search.json',
    {% for post in site.posts %}'{{ post.url }}',
	{% endfor %}
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
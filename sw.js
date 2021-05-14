// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/style.css',
  '/scripts/script.js',
  '/scripts/router.js',
  '/index.html',
  '/components/entry-page.js',
  '/components/journal-entry.js',
  '/images/lab.jpg',
  '/images/mountains.jpg',
  '/images/sky.jpg',
  '/settings.svg',
  'https://cse110lab6.herokuapp.com/entries'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  
});

//   - One for activation ( check out MDN's clients.claim() for this step )

self.addEventListener('activate', function(event) {

    var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
//   - One for fetch requests

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

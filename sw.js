// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/Lab7',
  '/Lab7/style.css',
  '/Lab7/scripts/script.js',
  '/Lab7/scripts/router.js',
  '/Lab7/index.html',
  '/Lab7/components/entry-page.js',
  '/Lab7/components/journal-entry.js',
  '/Lab7/images/lab.jpg',
  '/Lab7/images/mountains.jpg',
  '/Lab7/images/sky.jpg',
  '/Lab7/settings.svg',
  'https://cse110lab6.herokuapp.com/entries/'
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

    var cacheAllowlist = ['my-site-cache-v1'];
  
    event.waitUntil(
      clients.claim();
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

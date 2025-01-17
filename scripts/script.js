// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
//const setState = router.setState;

// Make sure you register your service worker here too
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      
      for(let i = 0; i < entries.length; i++){
        let newPost = document.createElement('journal-entry');
        newPost.entry = entries[i];
        document.querySelector('main').appendChild(newPost);
        newPost.shadowRoot.querySelector(".entry").onclick = function (){
          entryview(newPost,i);
          
        }
        
      }
      
    });
});

let title = document.getElementsByTagName("h1")[0];
let gear = document.getElementsByTagName("img")[0];
let bodyState = document.getElementsByTagName("body")[0];

title.addEventListener("click", () => {
  if (bodyState.className === "single-entry" || bodyState.className === "settings") {
    router.setState(1, bodyState, title, 0);
    document.getElementsByTagName("entry-page")[0].remove();
    let newEntry = document.createElement('entry-page');
    document.getElementsByTagName("main")[0].after(newEntry);
  };

});

gear.addEventListener("click", () => {
  router.setState(2, bodyState, title, 0);
});

let entryview = (e, i) => {
  router.setState(3, bodyState, title, i+1);
  document.getElementsByTagName("entry-page")[0].entry = e.entry;
}

/* service worker */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

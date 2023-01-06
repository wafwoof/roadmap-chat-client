self.addEventListener("install", event => {
    event.waitsUntil(
        caches.open("static").then(cache => {
            return cache.addAll(
                [
                    "./",
                    "./index.html",
                    "./chat.html",
                    "./login.html",
                    "./settings.html",
                    "./js/app.js",
                    "./js/check-credentials.js",
                    "./js/login.js",
                    "./js/vanity.js",
                    "./css/chat.css",
                    "./css/login.css",
                    "./css/settings.css",
                    "./images/icon.svg"
                ]
            );
        })
    )

});

// setup eventWorker proxy to forward network requests
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
       })
   );
});
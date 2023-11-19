 let cacheData="appv1";
 this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/index.html', // assuming this is your entry point
                '/static/js/bundle.js',
                'https://qa.corider.in/assignment/chat?page=1',
                // Add other necessary assets here
            ]);
        })
    )
 })


 this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found, else fetch from network
                return response || fetch(event.request);
            })
            .catch(() => {
                // Fallback logic for when the request is not in cache and the user is offline
                // Example: return a default offline page or a cached offline-specific resource
            })
    );
});
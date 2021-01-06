// Add custom service worker logic, such as a push notification serivce, or json request cache.

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("precache-v0").then(cache => {
            cache.addAll([
                "/shell.html",
                "/assets/icons/icon_24.png",
                "/assets/icons/icon_48.png",
                "/assets/icons/icon_192.png",
                "/assets/icons/icon_512.png"
            ])
        })
    )
})

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const response = await fetch(request).catch(function () {
        let url = new URL(request.url);
        if (url.origin == location.origin && url.pathname == '/') {
            console.log('return shell')
            return caches.match('/shell.html');
        }
        return caches.match(request)
    })

    return response
}
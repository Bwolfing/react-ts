declare const __webpack_hash__: string;

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
            try {
                let registration = await navigator.serviceWorker.register("/service-worker.bundle.js");

                console.log("Registered service worker!", registration.scope)
            }
            catch (e) {
                console.error("Service worked registraion failed", e);
            }
        });
    }
}

function install() {
    self.addEventListener("install", (event: InstallEvent) => {
        event.waitUntil(
            caches.open("Asset_Cache")
                .then(cache => {
                    console.log("Cache opened");
                    const assetsToCache = [
                        "/",
                        "/main.bundle.js",
                        "/vendor.bundle.js",
                        "/styles.bundle.css"
                    ];

                    return cache.addAll(assetsToCache.map(asset => {
                        if (process.env.NODE_ENV !== "production") {
                            return asset;
                        }

                        if (asset === "/") {
                            return asset;
                        }

                        let assetNamePieces = asset.split(".");

                        assetNamePieces.splice(assetNamePieces.length - 1, 0, __webpack_hash__)
                        console.log(assetNamePieces.join("."))
                        return assetNamePieces.join(".");
                    })).then(
                        () => console.log("Assets stored."),
                        (err) => console.error("Failed to add assets to asset cache.", err)
                    );
                })
        );
    });
}

function listenToFetches() {
    self.addEventListener("fetch", (event: FetchEvent) => {
        console.log("Checking cache for value ", event.request.url);
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log("Value found in cache");
                        return response;
                    }

                    console.log("Fetching request")
                    return fetch(event.request);
                })
        );
    }) ;
}

install();
listenToFetches();
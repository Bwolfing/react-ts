declare const __webpack_hash__: string;

function install() {
    self.addEventListener("install", (event: InstallEvent) => {
        event.waitUntil(
            caches.open("Asset_Cache")
                .then(cache => {
                    console.log("Cache opened");
                    // ["/", `/main.bundle.${__webpack_hash__}.js`, `/vendor.bundle.${__webpack_hash__}.js`, `styles.bundle.${__webpack_hash__}.css`]
                    // ["/", "/styles.bundle.css", "vendor.bundle.js", "/main.bundle.js"]
                    return cache.addAll(["/", `/main.bundle.${__webpack_hash__}.js`, `/vendor.bundle.${__webpack_hash__}.js`, `styles.bundle.${__webpack_hash__}.css`]).then(
                        () => {
                            console.log("Assets stored.");
                        },
                        (err) => {
                            console.error("Rejected", err);
                        }
                    );
                })
        );
    });
}

function listenToFetches() {
    self.addEventListener("fetch", (event: FetchEvent) => {
        console.log("Checking cache for value ", event.request);
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

console.log("New service worker v2");
install();
listenToFetches();
import { Routes } from "@app/application-routes";

declare const __webpack_hash__: string;

/**
 * Registers a new service work for the website.
 */
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

const AssetCache = `Asset_Cache_${__webpack_hash__}`;
const PageCache = `Page_Cache_${__webpack_hash__}`;
const ApplicationCache = `Application_Cache_${__webpack_hash__}`;
const ApplicationCaches = [
    AssetCache,
    PageCache,
    ApplicationCache
];

function onInstall(event: InstallEvent) {
    console.log("Installing service worker.");
    event.waitUntil(
        Promise.all([
            openAssetCache(),
            openPageCache()
        ])
    );

    function openAssetCache() {
        return caches.open(AssetCache)
            .then(cache => {
                console.log("Opened asset cache.");
                const assetsToCache = [
                    "/main.bundle.js",
                    "/vendor.bundle.js",
                    "/vendor.styles.bundle.css",
                    "/styles.bundle.css",
                ];

                pushFontAwesomeFiles(assetsToCache);

                return cache.addAll(assetsToCache).then(
                    () => console.log("Assets stored."),
                    err => console.error("Failed to add assets to asset cache.", err)
                );
            })
    }
    function openPageCache() {
        return caches.open(PageCache)
            .then(cache => {
                console.log("Opened page cache.");
                let routeUrls: string[] = [];

                for (const key in Routes) {
                    routeUrls.push(Routes[key]);
                }

                return cache.addAll(routeUrls).then(
                    () => console.log("Pages stored."),
                    err => console.error("Failed to add pages to page cache.", err)
                );
            })
    }
}

function pushFontAwesomeFiles(assetsToCache: string[]) {
    for (const fontAwesomeFile of ["fa-brands-400", "fa-regular-400", "fa-solid-900"]) {
        for (const fileType of ["eot", "svg", "ttf", "woff", "woff2"]) {
            assetsToCache.push(`/${fontAwesomeFile}.${fileType}`);
        }
    }
}

function onActivate(event: ActivateEvent) {
    console.log("activiating new service working.");
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(cacheNames.map(cacheName => {
                if (ApplicationCaches.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            }))
        )
    );
}

function onFetch(event: FetchEvent) {
    console.log("Checking cache for value ", event.request.url);
    event.respondWith(
        fetchValueForRequest(event).catch((() => caches.match(event.request)))
    );
}

async function fetchValueForRequest(event: FetchEvent): Promise<Response> {
    if (event.request.headers.get("content-type") === "application/json") {
        return fetchAndCacheIfSuccessful(event.request);
    }

    const cacheValue = await caches.match(event.request);

    if (cacheValue) {
        console.log("Value found in cache");
        return cacheValue;
    }

    console.log("Fetching request")
    return fetch(event.request);
}

async function fetchAndCacheIfSuccessful(request: Request): Promise<Response> {
    const requestClone = request.clone();
    const response = await fetch(requestClone)

    if (!response || !response.ok) {
        return response;
    }

    const responseClone = response.clone();
    const cache = await caches.open(ApplicationCache);

    cache.put(request, responseClone);

    return response;
}

self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", onActivate);
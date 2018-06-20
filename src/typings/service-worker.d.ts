interface InstallEvent extends Event {
    waitUntil(callback: Promise<void>): void;
}

interface FetchEvent extends Event {
    respondWith(promise: Promise<void>): void
    request: Request;
}

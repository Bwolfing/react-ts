interface InstallEvent extends Event {
    waitUntil(promise: Promise<void>): void;
}

interface FetchEvent extends Event {
    respondWith(promise: Promise<void>): void
    request: Request;
}

interface ActivateEvent extends Event {
    waitUntil<T>(promise: Promise<T>): void;
}
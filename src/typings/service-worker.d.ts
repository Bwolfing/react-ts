interface InstallEvent extends Event {
    waitUntil<T>(promise: Promise<T>): void;
}

interface FetchEvent extends Event {
    respondWith<T>(promise: Promise<T>): void
    request: Request;
}

interface ActivateEvent extends Event {
    waitUntil<T>(promise: Promise<T>): void;
}
/**
 * An abstraction for logging.
 */
export abstract class IWriteLog {
    abstract info(message: any, ...args: any[]): void;
    abstract error(message: any, ...args: any[]): void;
}
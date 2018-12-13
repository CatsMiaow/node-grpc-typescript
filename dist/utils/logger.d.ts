export declare type Parameter = [any?, ...any[]];
export declare class Logger {
    private readonly rootDir;
    constructor();
    info(...args: Parameter): void;
    warn(...args: Parameter): void;
    error(...args: Parameter): void;
    private trace;
}
export declare const logger: Logger;

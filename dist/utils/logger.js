"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class Logger {
    constructor() {
        this.rootDir = path_1.dirname(require.main.filename);
        if (process.env.pm_id && process.env.name !== 'discord') {
            this.rootDir = this.rootDir.replace('/dist', '/src');
        }
    }
    info(...args) {
        args.push(`- ${this.trace()}`);
        console.info.apply(console, args);
    }
    warn(...args) {
        args.push(`- ${this.trace()}`);
        console.warn.apply(console, args);
    }
    error(...args) {
        args.push(`- ${this.trace()}`);
        console.error.apply(console, args);
    }
    trace() {
        const lines = new Error().stack.split('\n').slice(1);
        const lineMatch = lines[2].match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/);
        if (!lineMatch || lineMatch[2] === null || lineMatch[3] === null) {
            return '';
        }
        const fileName = lineMatch[2].split(this.rootDir)[1];
        const line = lineMatch[3];
        return `${fileName}:${line}`;
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map
/* eslint-disable no-console */
import { dirname } from 'path';

export type Parameter = [unknown?, ...unknown[]];

/**
 * Logger Class
 */
export class Logger {
  private readonly rootDir: string = dirname((<NodeModule>require.main).filename);

  constructor() {
    if (process.env['pm_id']) {
      this.rootDir = this.rootDir.replace('/dist', '/src');
    }
  }

  public info(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.info(...args);
  }

  public warn(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.warn(...args);
  }

  public error(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.error(...args);
  }

  private trace(): string {
    const lines: string[] = (<string> new Error().stack).split('\n').slice(1);
    const lineMatch: RegExpMatchArray | null = /at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/.exec(lines[2]);

    if (!lineMatch || lineMatch[2] === null || lineMatch[3] === null) {
      return '';
    }

    const fileName: string = lineMatch[2].split(this.rootDir)[1];
    const line: string = lineMatch[3];

    return `${fileName}:${line}`;
  }
}

export const logger: Logger = new Logger();

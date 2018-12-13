import { dirname } from 'path';

// tslint:disable-next-line: no-any
export type Parameter = [any?, ...any[]];

/* tslint:disable:no-console */
/**
 * 로그 클래스
 */
export class Logger {
  private readonly rootDir: string = dirname((<NodeModule>require.main).filename);

  constructor() {
    if (process.env.pm_id && process.env.name !== 'discord') {
      this.rootDir = this.rootDir.replace('/dist', '/src');
    }
  }

  public info(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.info.apply(console, args);
  }

  public warn(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.warn.apply(console, args);
  }

  public error(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.error.apply(console, args);
  }

  private trace(): string {
    const lines: string[] = (<string>new Error().stack).split('\n').slice(1);
    const lineMatch: RegExpMatchArray | null = lines[2].match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/);

    if (!lineMatch || lineMatch[2] === null || lineMatch[3] === null) {
      return '';
    }

    const fileName: string = lineMatch[2].split(this.rootDir)[1];
    const line: string = lineMatch[3];

    return `${fileName}:${line}`;
  }
}
/* tslint:enable:no-console */

export const logger: Logger = new Logger();

export class Logger {
  constructor() {
    this.enable = true;
  }

  enable: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(...args: any[]) {
    if (this.enable) {
      console.log('INFO:', ...args);
    }
  }

  debug(...args: any[]) {
    if (this.enable) {
      console.log('DEBUG:', ...args);
    }
  }

  error(...args: any[]) {
    if (this.enable) {
      console.error('ERR:', ...args);
    }
  }
}

import * as vscode from 'vscode';

const outputChannel = vscode.window.createOutputChannel('RMate', {log: true});

class CategoryLogger {
  constructor(private readonly category: string) {}

  private message(message: string): string {
    return `[${this.category}] ${message}`;
  }

  trace(message: string, ...args: any[]): void {
    outputChannel.trace(this.message(message), ...args);
  }

  debug(message: string, ...args: any[]): void {
    outputChannel.debug(this.message(message), ...args);
  }

  info(message: string, ...args: any[]): void {
    outputChannel.info(this.message(message), ...args);
  }

  warn(message: string, ...args: any[]): void {
    outputChannel.warn(this.message(message), ...args);
  }

  error(error: string | Error, ...args: any[]): void {
    if (typeof error === 'string') {
      outputChannel.error(this.message(error), ...args);
      return;
    }

    outputChannel.error(this.message(error.message), error, ...args);
  }
}

class Logger {
  static readonly outputChannel = outputChannel;

  static getLogger(category: string): CategoryLogger {
    return new CategoryLogger(category);
  }
}

export default Logger;

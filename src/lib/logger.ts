type LogLevel = "debug" | "info" | "warn" | "error";

type LogArgs = unknown[];

function shouldLog(level: LogLevel): boolean {
  // Keep warn/error in prod. Silence debug/info by default.
  const env = process.env.NODE_ENV;
  if (env === "production") return level === "warn" || level === "error";
  return true;
}

function normalizeScope(scope?: string): string {
  if (!scope) return "APP";
  return scope.trim() ? scope.trim().toUpperCase() : "APP";
}

function prefix(scope?: string): string {
  return `[${normalizeScope(scope)}]`;
}

function log(level: LogLevel, scope: string | undefined, ...args: LogArgs): void {
  if (!shouldLog(level)) return;

  const p = `${prefix(scope)}[${level.toUpperCase()}]`;

  // Project ESLint allows only warn/error. Route debug/info through warn.
  if (level === "error") {
    console.error(p, ...args);
    return;
  }

  console.warn(p, ...args);
}

export interface Logger {
  debug: (...args: LogArgs) => void;
  info: (...args: LogArgs) => void;
  warn: (...args: LogArgs) => void;
  error: (...args: LogArgs) => void;
  scope: (scope: string) => Logger;
}

function createScopedLogger(scope?: string): Logger {
  return {
    debug: (...args) => log("debug", scope, ...args),
    info: (...args) => log("info", scope, ...args),
    warn: (...args) => log("warn", scope, ...args),
    error: (...args) => log("error", scope, ...args),
    scope: (nextScope) => createScopedLogger(nextScope),
  };
}

// Singleton logger (SYM)
export const logger: Logger = createScopedLogger();

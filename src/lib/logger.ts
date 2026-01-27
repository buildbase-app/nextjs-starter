/**
 * Centralized Logging Utility
 *
 * Features:
 * - Different output formats for dev (colored, readable) vs prod (JSON)
 * - Log levels with filtering
 * - Context/metadata support
 * - Request ID tracking
 * - Configurable via environment
 *
 * Usage:
 *   import { logger } from '@/lib/logger';
 *
 *   logger.info('User logged in', { userId: '123' });
 *   logger.error('Failed to fetch', { error: err.message });
 *
 *   // With context
 *   const reqLogger = logger.child({ requestId: 'abc-123' });
 *   reqLogger.info('Processing request');
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
}

// Log level priority (lower = more verbose)
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// ANSI color codes for terminal output
const COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m', // Green
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
};
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';

// Environment detection
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// Minimum log level (can be set via LOG_LEVEL env var)
const minLevel: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) || (isDev ? 'debug' : 'info');

/**
 * Check if a log level should be output
 */
function shouldLog(level: LogLevel): boolean {
  if (isTest && !process.env.LOG_IN_TESTS) return false;
  return LOG_LEVELS[level] >= LOG_LEVELS[minLevel];
}

/**
 * Format timestamp for dev output
 */
function formatTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format context object for dev output
 */
function formatContext(context: LogContext): string {
  const entries = Object.entries(context);
  if (entries.length === 0) return '';

  const formatted = entries
    .map(([key, value]) => {
      const val =
        typeof value === 'object' ? JSON.stringify(value) : String(value);
      return `${DIM}${key}=${RESET}${val}`;
    })
    .join(' ');

  return ` ${formatted}`;
}

/**
 * Development logger - colorized, human-readable
 */
function logDev(level: LogLevel, message: string, context?: LogContext): void {
  const color = COLORS[level];
  const time = `${DIM}${formatTime()}${RESET}`;
  const levelTag = `${color}${BOLD}[${level.toUpperCase()}]${RESET}`;
  const contextStr = context ? formatContext(context) : '';

  const output = `${time} ${levelTag} ${message}${contextStr}`;

  switch (level) {
    case 'debug':
      console.debug(output);
      break;
    case 'info':
      console.info(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    case 'error':
      console.error(output);
      break;
  }
}

/**
 * Production logger - JSON format for log aggregation
 */
function logProd(level: LogLevel, message: string, context?: LogContext): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context && Object.keys(context).length > 0 && { context }),
  };

  const output = JSON.stringify(entry);

  switch (level) {
    case 'debug':
    case 'info':
      console.log(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    case 'error':
      console.error(output);
      break;
  }
}

/**
 * Main log function - routes to dev or prod formatter
 */
function log(level: LogLevel, message: string, context?: LogContext): void {
  if (!shouldLog(level)) return;

  if (isDev) {
    logDev(level, message, context);
  } else {
    logProd(level, message, context);
  }
}

/**
 * Logger interface with child logger support
 */
interface Logger {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  child: (defaultContext: LogContext) => Logger;
}

/**
 * Create a logger instance with optional default context
 */
function createLogger(defaultContext?: LogContext): Logger {
  const mergeContext = (context?: LogContext): LogContext | undefined => {
    if (!defaultContext && !context) return undefined;
    return { ...defaultContext, ...context };
  };

  return {
    debug: (message: string, context?: LogContext) =>
      log('debug', message, mergeContext(context)),

    info: (message: string, context?: LogContext) =>
      log('info', message, mergeContext(context)),

    warn: (message: string, context?: LogContext) =>
      log('warn', message, mergeContext(context)),

    error: (message: string, context?: LogContext) =>
      log('error', message, mergeContext(context)),

    /**
     * Create a child logger with inherited context
     * Useful for request-scoped logging
     *
     * @example
     * const reqLogger = logger.child({ requestId: req.id });
     * reqLogger.info('Processing'); // Includes requestId in all logs
     */
    child: (childContext: LogContext) =>
      createLogger({ ...defaultContext, ...childContext }),
  };
}

/**
 * Default logger instance
 */
export const logger = createLogger();

/**
 * Create a request-scoped logger
 * Includes requestId and optional user context
 */
export function createRequestLogger(
  requestId: string,
  userId?: string
): Logger {
  return logger.child({
    requestId,
    ...(userId && { userId }),
  });
}

/**
 * Log configuration for debugging
 */
export function getLogConfig() {
  return {
    environment: process.env.NODE_ENV,
    minLevel,
    isDev,
    isTest,
  };
}

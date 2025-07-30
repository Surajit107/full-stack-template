import { LoggerService } from '@nestjs/common';

export const loggerConfig = {
  // Log levels: 'error', 'warn', 'log', 'debug', 'verbose'
  levels: process.env.LOG_LEVEL ? 
    process.env.LOG_LEVEL.split(',') : 
    ['error', 'warn', 'log', 'debug', 'verbose'],
  
  // Custom logger format
  format: (message: string, context?: string) => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${context || 'Nest'}] ${message}`;
  },
  
  // Environment-specific settings
  isProduction: process.env.NODE_ENV === 'production',
  
  // Enable request logging
  enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'false',
  
  // Enable database query logging
  enableQueryLogging: process.env.ENABLE_QUERY_LOGGING === 'true',
};

export class CustomLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log(loggerConfig.format(message, context));
  }

  error(message: string, trace?: string, context?: string) {
    console.error(loggerConfig.format(`ERROR: ${message}`, context));
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    console.warn(loggerConfig.format(`WARN: ${message}`, context));
  }

  debug(message: string, context?: string) {
    if (loggerConfig.levels.includes('debug')) {
      console.debug(loggerConfig.format(`DEBUG: ${message}`, context));
    }
  }

  verbose(message: string, context?: string) {
    if (loggerConfig.levels.includes('verbose')) {
      console.log(loggerConfig.format(`VERBOSE: ${message}`, context));
    }
  }
}
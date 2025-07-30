import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { loggerConfig } from '../config/logger.config';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    if (loggerConfig.enableRequestLogging) {
      const startTime = Date.now();
      const { method, originalUrl, ip } = req;
      
      this.logger.log(`📥 ${method} ${originalUrl} - IP: ${ip}`);
      
      // Log response when it finishes
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        const { statusCode } = res;
        
        if (statusCode >= 400) {
          this.logger.warn(`📤 ${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`);
        } else {
          this.logger.log(`📤 ${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`);
        }
      });
    }
    
    next();
  }
}
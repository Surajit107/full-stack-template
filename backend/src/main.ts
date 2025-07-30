import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { loggerConfig } from '@infrastructure/config/logger.config';
import * as serverless from 'serverless-http';
import {
  NODE_ENV,
  PORT,
  CORS_ORIGINS
} from '@constants/index';

let server: any;
let app: any;
const logger = new Logger('Bootstrap');

async function bootstrap() {
  if (app) {
    return app;
  }

  app = await NestFactory.create(AppModule, {
    logger: loggerConfig.isProduction ?
      ['error', 'warn', 'log'] as const :
      loggerConfig.levels as ('error' | 'warn' | 'log' | 'debug' | 'verbose')[],
  });

  // Enable CORS for frontend - more permissive for development
  const isDevelopment = NODE_ENV !== 'production';

  app.enableCors({
    origin: isDevelopment ? true : CORS_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'X-Client-Environment',
      'X-Client-Version',
      'x-apollo-operation-name',
      'apollo-require-preflight'
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));



  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  server = serverless(expressApp, {
    request: (request: any, event: any, context: any) => {
      // Add Lambda context to request for logging
      request.lambdaContext = context;
      request.lambdaEvent = event;
    },
    response: (response: any, request: any, event: any, context: any) => {
      // Add response headers for Lambda
      response.headers = response.headers || {};
      response.headers['X-Lambda-Execution-Time'] = context.getRemainingTimeInMillis();
      response.headers['X-Lambda-Memory-Limit'] = context.memoryLimitInMB;
      response.headers['X-Lambda-Request-Id'] = context.awsRequestId;
    }
  });

  // For local development
  if (NODE_ENV !== 'production') {
    await app.listen(PORT);
    logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
    logger.log(`📚 GraphQL Playground available at: ${await app.getUrl()}/graphql`);
    logger.log(`🔧 Environment: ${NODE_ENV}`);
    logger.log(`📊 Log levels enabled: ${loggerConfig.levels.join(', ')}`);
    logger.log(`🌐 CORS enabled for: ${isDevelopment ? 'all origins (development)' : 'specific origins'}`);
  }

  return app;
}

// AWS Lambda handler with enhanced error handling
export const handler = async (event: any, context: any) => {
  const startTime = Date.now();

  try {
    if (!server) {
      await bootstrap();
    }

    const result = await server(event, context);

    // Log Lambda execution metrics
    const executionTime = Date.now() - startTime;
    logger.log(`Lambda execution completed in ${executionTime}ms. Request ID: ${context.awsRequestId}`);

    return result;
  } catch (error) {
    logger.error(`Lambda execution failed: ${error.message}`, error.stack);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Lambda-Error': 'Internal Server Error',
        'X-Lambda-Request-Id': context.awsRequestId,
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        requestId: context.awsRequestId,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

// For local development
if (NODE_ENV !== 'production') {
  bootstrap();
}

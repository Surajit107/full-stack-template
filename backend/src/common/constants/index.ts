export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT || '3001', 10);
export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'];
export const APP_NAME = process.env.APP_NAME || 'GraphQL Backend';
export const APP_VERSION = process.env.APP_VERSION || '1.0.0'; 
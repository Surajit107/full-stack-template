import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout for Lambda cold starts
});

// Request interceptor for logging and Lambda headers
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        
        // Add Lambda-specific headers if available
        if (typeof window !== 'undefined') {
            config.headers['X-Client-Version'] = '1.0.0';
            config.headers['X-Client-Environment'] = process.env.NEXT_PUBLIC_ENV || 'development';
        }
        
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling and Lambda metrics
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        
        // Log Lambda-specific headers if available
        const lambdaHeaders = {
            executionTime: response.headers['x-lambda-execution-time'],
            memoryLimit: response.headers['x-lambda-memory-limit'],
            requestId: response.headers['x-lambda-request-id'],
        };
        
        if (lambdaHeaders.requestId) {
            console.log('Lambda Metrics:', lambdaHeaders);
        }
        
        return response;
    },
    (error) => {
        console.error('API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url,
            requestId: error.response?.headers?.['x-lambda-request-id'],
        });
        
        // Handle specific Lambda errors
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout - Lambda might be cold starting');
        }
        
        return Promise.reject(error);
    }
);
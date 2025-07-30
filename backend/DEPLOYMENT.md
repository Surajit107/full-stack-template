# AWS Lambda Deployment Guide

This guide explains how to deploy your NestJS application to AWS Lambda using the Serverless Framework.

## Prerequisites

1. **AWS CLI** installed and configured
2. **Node.js** 18.x or higher
3. **Serverless Framework** installed globally: `npm install -g serverless`

## Environment Setup

1. Copy the environment file:
   ```bash
   cp env.example .env
   ```

2. Configure your environment variables:
   ```bash
   # Development
   MONGODB_URI=mongodb://localhost:27017/aws-lambda-app
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000

   # Production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aws-lambda-app
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.com
   ```

## Local Development

### Start the application locally:
```bash
npm run start:dev
```

### Test with Serverless Offline:
```bash
npm run offline:start
```

## Deployment Commands

### Deploy to Development:
```bash
npm run deploy:dev
```

### Deploy to Production:
```bash
npm run deploy:prod
```

### Deploy to Custom Stage:
```bash
serverless deploy --stage staging
```

### Remove Deployment:
```bash
npm run remove
```

## Monitoring and Logs

### View Lambda Logs:
```bash
npm run logs
```

### Tail Lambda Logs (real-time):
```bash
npm run logs:tail
```

### Get Deployment Info:
```bash
npm run info
```

## AWS Lambda Features

### Cold Start Optimization
- The application uses singleton pattern to reuse the NestJS app instance
- Connection pooling for MongoDB is optimized for Lambda environment
- Memory allocation is set to 1024MB for better performance

### Error Handling
- Comprehensive error handling with detailed logging
- Lambda-specific error responses with request IDs
- Graceful degradation for database connection issues

### Performance Monitoring
- Execution time tracking
- Memory usage monitoring
- Request ID correlation for debugging

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `AWS_REGION` | AWS region for deployment | Yes |

## API Endpoints

After deployment, your API will be available at:
- **Health Check**: `GET /health`
- **Users API**: `GET /users`, `POST /users`, etc.
- **Swagger Docs**: `/api` (development only)

## Troubleshooting

### Common Issues:

1. **Cold Start Delays**: Normal for Lambda, subsequent requests will be faster
2. **Database Connection**: Ensure MongoDB Atlas allows connections from AWS Lambda
3. **CORS Issues**: Verify `FRONTEND_URL` is correctly set
4. **Memory Issues**: Increase `memorySize` in `serverless.yml` if needed

### Debug Commands:
```bash
# Test locally
npm run offline:start

# Check logs
npm run logs:tail

# Package without deploying
npm run package
```

## Security Considerations

1. **Environment Variables**: Use AWS Secrets Manager for sensitive data
2. **CORS**: Configure allowed origins properly
3. **IAM Roles**: Minimal required permissions
4. **VPC**: Consider using VPC for database access

## Cost Optimization

1. **Memory**: Start with 1024MB, adjust based on performance
2. **Timeout**: Set appropriate timeout (30s default)
3. **Concurrency**: Use reserved concurrency for predictable costs
4. **Logging**: Configure log retention appropriately
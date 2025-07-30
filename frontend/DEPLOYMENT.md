# Frontend Deployment Guide for AWS Lambda

This guide explains how to configure and deploy the frontend to work with your AWS Lambda backend.

## Environment Configuration

### 1. Create Environment File

Copy the example environment file:
```bash
cp env.example .env.local
```

### 2. Configure Environment Variables

**For Development (Local Lambda):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ENV=development
```

**For Production (AWS Lambda):**
```bash
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.amazonaws.com/dev
NEXT_PUBLIC_ENV=production
```

## AWS Lambda Integration Features

### 1. **Enhanced Error Handling**
- Automatic retry logic for cold starts
- Timeout handling (30 seconds)
- Lambda-specific error messages

### 2. **Performance Monitoring**
- Lambda execution time tracking
- Memory usage monitoring
- Request ID correlation

### 3. **Cold Start Optimization**
- Retry mechanism for failed requests
- Progressive loading states
- User-friendly error messages

## Development Workflow

### 1. **Local Development**
```bash
# Start frontend
npm run dev

# Start backend (in another terminal)
cd ../backend
npm run offline:start
```

### 2. **Testing with Lambda**
```bash
# Deploy backend to AWS
cd ../backend
npm run deploy:dev

# Update frontend environment
# Set NEXT_PUBLIC_API_URL to your Lambda URL
```

## Production Deployment

### 1. **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. **Environment Variables in Vercel**
Set these in your Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: Your AWS Lambda API Gateway URL
- `NEXT_PUBLIC_ENV`: `production`

### 3. **Custom Domain (Optional)**
Configure your custom domain in Vercel dashboard.

## API Gateway URL Format

Your Lambda API Gateway URL will look like:
```
https://[api-id].execute-api.[region].amazonaws.com/[stage]/
```

Example:
```
https://abc123def.execute-api.us-east-1.amazonaws.com/dev/
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your Lambda CORS is configured correctly
2. **Cold Start Delays**: Normal for Lambda, retry logic handles this
3. **Timeout Errors**: Increase timeout in API configuration if needed
4. **Environment Variables**: Ensure `NEXT_PUBLIC_` prefix for client-side variables

### Debug Commands:
```bash
# Check API connectivity
curl https://your-lambda-url.amazonaws.com/dev/health

# Test from frontend
npm run dev
# Then check browser console for API logs
```

## Performance Tips

1. **Enable Caching**: Use Next.js caching for static assets
2. **Optimize Images**: Use Next.js Image component
3. **Bundle Analysis**: Run `npm run build` to analyze bundle size
4. **CDN**: Vercel provides global CDN automatically

## Security Considerations

1. **Environment Variables**: Never expose sensitive data in client-side code
2. **API Keys**: Use proper authentication for your Lambda API
3. **CORS**: Configure allowed origins properly
4. **HTTPS**: Always use HTTPS in production
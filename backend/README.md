<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# AWS Lambda Backend

A NestJS application designed to run on AWS Lambda with MongoDB integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- AWS CLI (for deployment)

### Installation
```bash
npm install
```

### Environment Setup
Copy the example environment file:
```bash
cp env.example .env
```

Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/aws-lambda-app
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Development
```bash
npm run start:dev
```

### Production Build
```bash
npm run build
```

## 🌐 CORS Configuration

The application is configured with comprehensive CORS settings to support frontend integration:

### Development CORS Settings
- **Origins**: `http://localhost:3000`, `http://localhost:3001`, `http://127.0.0.1:3000`, `http://127.0.0.1:3001`
- **Methods**: GET, POST, PUT, PATCH, DELETE, OPTIONS
- **Headers**: Content-Type, Authorization, Accept, X-Requested-With
- **Credentials**: Enabled

### Testing CORS
Run the CORS test script to verify configuration:
```bash
node test-cors.js
```

### Common CORS Issues
1. **Port Mismatch**: Ensure frontend URL matches `FRONTEND_URL` in `.env`
2. **Missing Headers**: Check that required headers are included in requests
3. **Preflight Requests**: OPTIONS requests are automatically handled

## 📊 GraphQL API

This backend now uses GraphQL instead of REST APIs. The GraphQL playground is available at `/graphql` when the server is running.

### Available Queries
- `users` - Get all users with optional filtering and pagination
- `user(id: ID!)` - Get user by ID
- `activeUsers` - Get all active users
- `userCount` - Get total user count

### Available Mutations
- `createUser(input: CreateUserInput!)` - Create new user
- `updateUser(id: ID!, input: UpdateUserInput!)` - Update user
- `deleteUser(id: ID!)` - Delete user
- `toggleUserStatus(id: ID!, isActive: Boolean!)` - Toggle user status

### Documentation
- `GET /graphql` - GraphQL Playground
- See [GRAPHQL_API.md](./GRAPHQL_API.md) for detailed documentation

## 🛠️ Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debug mode
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run build:lambda` - Build for AWS Lambda deployment
- `npm run deploy:lambda` - Deploy to AWS Lambda

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `LOG_LEVEL` - Logging level
- `ENABLE_REQUEST_LOGGING` - Enable request logging
- `ENABLE_QUERY_LOGGING` - Enable database query logging

## 🚀 AWS Lambda Deployment

### Prerequisites
1. AWS CLI configured
2. AWS Lambda function created
3. MongoDB accessible from Lambda

### Deployment Steps
1. Build the application:
   ```bash
   npm run build:lambda
   ```

2. Deploy to AWS Lambda:
   ```bash
   npm run deploy:lambda
   ```

### Environment Variables for Lambda
Set these in your AWS Lambda function:
- `MONGODB_URI` - Your MongoDB connection string
- `NODE_ENV` - production
- `FRONTEND_URL` - Your frontend URL

## 📝 Logging

The application uses a custom logger with configurable levels:
- `error` - Error messages
- `warn` - Warning messages
- `log` - General information
- `debug` - Debug information
- `verbose` - Detailed debugging

### Request Logging
All HTTP requests are logged with timing information when enabled.

## 🔍 Troubleshooting

### CORS Issues
1. Check that `FRONTEND_URL` matches your frontend
2. Verify the backend is running on the correct port
3. Test with the CORS test script
4. Check browser console for CORS errors

### Database Connection
1. Verify MongoDB is running
2. Check `MONGODB_URI` in environment
3. Ensure network connectivity

### Lambda Deployment
1. Check AWS credentials
2. Verify Lambda function exists
3. Check environment variables in Lambda
4. Review CloudWatch logs

## 📚 Dependencies

### Core
- `@nestjs/common` - NestJS framework
- `@nestjs/graphql` - GraphQL integration
- `@nestjs/apollo` - Apollo Server integration
- `@nestjs/mongoose` - MongoDB integration
- `mongoose` - MongoDB ODM
- `graphql` - GraphQL runtime
- `apollo-server-express` - Apollo Server for Express
- `serverless-http` - Lambda integration

### Development
- `@nestjs/cli` - NestJS CLI
- `@types/node` - TypeScript types
- `jest` - Testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

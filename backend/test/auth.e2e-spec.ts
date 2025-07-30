import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/graphql (POST) - should login successfully', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation Login($loginDto: LoginDto!) {
            login(loginDto: $loginDto) {
              user {
                _id
                name
                email
                role
              }
              accessToken
              refreshToken
            }
          }
        `,
        variables: {
          loginDto: {
            email: 'admin@example.com',
            password: 'admin123'
          }
        }
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.login).toBeDefined();
        expect(res.body.data.login.user).toBeDefined();
        expect(res.body.data.login.accessToken).toBeDefined();
        expect(res.body.data.login.user.role).toBe('admin');
      });
  });

  it('/graphql (POST) - should fail login with wrong credentials', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation Login($loginDto: LoginDto!) {
            login(loginDto: $loginDto) {
              user {
                _id
                name
                email
                role
              }
              accessToken
              refreshToken
            }
          }
        `,
        variables: {
          loginDto: {
            email: 'admin@example.com',
            password: 'wrongpassword'
          }
        }
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors[0].message).toContain('Invalid credentials');
      });
  });

  it('/graphql (POST) - should register new user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation Register($registerDto: RegisterDto!) {
            register(registerDto: $registerDto) {
              user {
                _id
                name
                email
                role
              }
              accessToken
              refreshToken
            }
          }
        `,
        variables: {
          registerDto: {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'user'
          }
        }
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.register).toBeDefined();
        expect(res.body.data.register.user).toBeDefined();
        expect(res.body.data.register.accessToken).toBeDefined();
        expect(res.body.data.register.user.role).toBe('user');
      });
  });
}); 
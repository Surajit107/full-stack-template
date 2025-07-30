import { IUser } from './user.interface';

export interface IAuthPayload {
  sub: string;
  email: string;
  role: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRegisterDto {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthService {
  login(loginDto: ILoginDto): Promise<IAuthResponse>;
  logout(userId: string): Promise<void>;
  refreshToken(token: string): Promise<IAuthResponse>;
  validateUser(email: string, password: string): Promise<IUser | null>;
  generateTokens(payload: IAuthPayload): Promise<{ accessToken: string; refreshToken: string }>;
}

export interface IAuthRepository {
  createUser(userData: IRegisterDto): Promise<IUser>;
  findByEmail(email: string): Promise<any>;
  updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
  removeRefreshToken(userId: string): Promise<void>;
}

export interface IAuthResolver {
  login(loginDto: any): Promise<IAuthResponse>;
  logout(user: any): Promise<{ message: string }>;
  refreshToken(input: any): Promise<IAuthResponse>;
  register(registerDto: any): Promise<IAuthResponse>;
} 
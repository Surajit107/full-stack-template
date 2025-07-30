export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
} 
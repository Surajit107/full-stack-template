import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IAuthResolver, IAuthResponse } from '@interfaces/auth.interface';
import { AuthGuard, CurrentUser, Public } from '@common';
import { IUser } from '@interfaces/user.interface';
import { 
  AuthResponse, 
  LogoutResponse, 
  RefreshTokenResponse,
  LoginInput,
  RegisterInput,
  RefreshTokenInput
} from '@graphql/types/auth.types';

@Resolver()
export class AuthResolver implements IAuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @Public()
  async login(@Args('loginDto') loginDto: LoginInput): Promise<IAuthResponse> {
    return this.authService.login(loginDto);
  }

  @Mutation(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async logout(@CurrentUser() user: IUser): Promise<{ message: string }> {
    await this.authService.logout(user._id);
    return { message: 'Successfully logged out' };
  }

  @Mutation(() => RefreshTokenResponse)
  @Public()
  async refreshToken(@Args('input') input: RefreshTokenInput): Promise<IAuthResponse> {
    return this.authService.refreshToken(input.token);
  }

  @Mutation(() => AuthResponse)
  @Public()
  async register(@Args('registerDto') registerDto: RegisterInput): Promise<IAuthResponse> {
    return this.authService.register(registerDto);
  }
} 
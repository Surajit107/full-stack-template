import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/auth.repository';
import { 
  IAuthService, 
  ILoginDto, 
  IAuthResponse, 
  IAuthPayload, 
  IRegisterDto 
} from '@interfaces/auth.interface';
import { IUser } from '@interfaces/user.interface';
import { UserDocument } from '@modules/user/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: ILoginDto): Promise<IAuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens({
      sub: user._id,
      email: user.email,
      role: user.role,
    });

    await this.authRepository.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.removeRefreshToken(userId);
  }

  async refreshToken(token: string): Promise<IAuthResponse> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.authRepository.findByEmail(payload.email);
      
      if (!user || user.refreshToken !== token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens({
        sub: user._id,
        email: user.email,
        role: user.role,
      });

      await this.authRepository.updateRefreshToken(user._id, tokens.refreshToken);

      return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.authRepository.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password!)) {
      const userDoc = user as UserDocument;
      const { password, refreshToken, ...result } = userDoc.toObject();
      return result as IUser;
    }
    
    return null;
  }

  async generateTokens(payload: IAuthPayload): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '1h' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(registerDto: IRegisterDto): Promise<IAuthResponse> {
    const existingUser = await this.authRepository.findByEmail(registerDto.email);
    
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = await this.authRepository.createUser(registerDto);
    
    const tokens = await this.generateTokens({
      sub: user._id,
      email: user.email,
      role: user.role,
    });

    await this.authRepository.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
} 
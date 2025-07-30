import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/entities/user.entity';
import { IAuthRepository, IRegisterDto } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(userData: IRegisterDto): Promise<IUser> {
    const { password, ...userInfo } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new this.userModel({
      ...userInfo,
      password: hashedPassword,
      role: userData.role || 'user',
    });
    
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken }).exec();
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null }).exec();
  }
} 
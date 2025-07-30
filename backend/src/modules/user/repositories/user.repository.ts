import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@abstract/base.repository';
import { User, UserDocument } from '../entities/user.entity';
import { IUserRepository } from '@interfaces/user.interface';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findActiveUsers(): Promise<UserDocument[]> {
    return await this.userModel.find({ isActive: true }).exec();
  }

  async findWithPagination(filter: any, sort: any, skip: number, limit: number): Promise<UserDocument[]> {
    let query = this.userModel.find(filter);
    
    if (sort) {
      query = query.sort(sort);
    }
    
    return await query.skip(skip).limit(limit).exec();
  }

  async countWithFilter(filter: any): Promise<number> {
    return await this.userModel.countDocuments(filter).exec();
  }
} 
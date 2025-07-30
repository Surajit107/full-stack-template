import { Injectable } from '@nestjs/common';
import { BaseService } from '@abstract/base.service';
import { UserRepository } from '../repositories/user.repository';
import { IUserService, IUserQueryDto } from '@interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { PaginatedUserResponse } from '../dto/pagination.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> implements IUserService {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findActiveUsers(): Promise<User[]> {
    return await this.userRepository.findActiveUsers();
  }

  async findWithPagination(query: IUserQueryDto): Promise<PaginatedUserResponse> {
    const { search, status, sortBy, sortOrder, page = 1, limit = 10 } = query;
    
    // Build filter object
    const filter: any = {};
    
    // Status filter
    if (status && status !== 'all') {
      filter.isActive = status === 'active';
    }
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get users with pagination
    const users = await this.userRepository.findWithPagination(filter, sort, skip, limit);
    
    // Get total count for pagination
    const total = await this.userRepository.countWithFilter(filter);
    
    // Calculate pagination metadata
    const meta = this.calculatePaginationMeta(total, page, limit);
    
    return {
      data: users,
      meta: meta
    };
  }

  async toggleStatus(id: string, isActive: boolean): Promise<User> {
    const user = await this.userRepository.update(id, { isActive });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
} 
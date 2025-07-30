import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
  PaginatedUserResponse
} from '../dto';
import { User } from '../entities/user.entity';
import { AuthGuard, RolesGuard, Roles, Public } from '@common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async users(@Args('input') input: UserQueryDto): Promise<User[]> {
    const result = await this.userService.findWithPagination(input);
    return result.data;
  }

  @Query(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Query(() => [User])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async activeUsers(): Promise<User[]> {
    return this.userService.findActiveUsers();
  }

  @Query(() => Int)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async userCount(): Promise<number> {
    return this.userService.count();
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async createUser(@Args('input') input: CreateUserDto): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async toggleUserStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('isActive') isActive: boolean
  ): Promise<User> {
    return this.userService.toggleStatus(id, isActive);
  }

  @Query(() => PaginatedUserResponse)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async usersWithPagination(@Args('input') input: UserQueryDto): Promise<PaginatedUserResponse> {
    return this.userService.findWithPagination(input);
  }
} 
import {
  IBaseRepository,
  IBaseService,
  IBaseResolver,
  IPaginatedResponse
} from '@interfaces/base.interface';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  age?: number;
  bio?: string;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserDto {
  name: string;
  email: string;
  password?: string;
  role?: string;
  age?: number;
  bio?: string;
  isActive?: boolean;
}

export interface IUpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  age?: number;
  bio?: string;
  isActive?: boolean;
}

export interface IUserQueryDto {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findActiveUsers(): Promise<IUser[]>;
  findWithPagination(filter: any, sort: any, skip: number, limit: number): Promise<IUser[]>;
  countWithFilter(filter: any): Promise<number>;
}

export interface IUserService extends IBaseService<IUser, ICreateUserDto, IUpdateUserDto> {
  findByEmail(email: string): Promise<IUser | null>;
  findActiveUsers(): Promise<IUser[]>;
  findWithPagination(query: IUserQueryDto): Promise<IPaginatedResponse<IUser>>;
  toggleStatus(id: string, isActive: boolean): Promise<IUser>;
}

export interface IUserResolver extends IBaseResolver<IUser, ICreateUserDto, IUpdateUserDto> {
  findActiveUsers(): Promise<IUser[]>;
  findWithPagination(query: IUserQueryDto): Promise<IPaginatedResponse<IUser>>;
  toggleStatus(id: string, isActive: boolean): Promise<IUser>;
  userCount(): Promise<number>;
} 
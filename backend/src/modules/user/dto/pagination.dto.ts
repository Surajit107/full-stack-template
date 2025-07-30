import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IPaginationMeta, IPaginatedResponse } from '@interfaces/base.interface';
import { User } from '../entities/user.entity';

@ObjectType()
export class PaginationMeta implements IPaginationMeta {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPrevPage: boolean;
}

@ObjectType()
export class PaginatedUserResponse implements IPaginatedResponse<User> {
  @Field(() => [User])
  data: User[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
} 
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, Min, Max, IsIn } from 'class-validator';
import { IUserQueryDto } from '@interfaces/user.interface';

@InputType()
export class UserQueryDto implements IUserQueryDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['all', 'active', 'inactive'])
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: string;

  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
} 
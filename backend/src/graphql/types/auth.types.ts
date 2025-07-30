import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { User } from '@modules/user/entities/user.entity';
import { IUser } from '@interfaces/user.interface';

// Input Types
@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  role?: string;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  token: string;
}

// Output Types
@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: IUser;

  @Field()
  accessToken: string;

  @Field({ nullable: true })
  refreshToken?: string;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}

@ObjectType()
export class RefreshTokenResponse {
  @Field(() => User)
  user: IUser;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class AuthError {
  @Field()
  message: string;

  @Field()
  code: string;
}

// Union Types for better error handling
@ObjectType()
export class AuthResult {
  @Field(() => AuthResponse, { nullable: true })
  data?: AuthResponse;

  @Field(() => AuthError, { nullable: true })
  error?: AuthError;
} 
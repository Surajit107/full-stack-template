import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { IUser } from '@interfaces/user.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop({ select: false })
  password?: string;

  @Field()
  @Prop({ required: true, default: 'user' })
  role: string;

  @Field(() => Int, { nullable: true })
  @Prop()
  age?: number;

  @Field({ nullable: true })
  @Prop()
  bio?: string;

  @Field()
  @Prop({ default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Prop({ select: false })
  refreshToken?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User); 
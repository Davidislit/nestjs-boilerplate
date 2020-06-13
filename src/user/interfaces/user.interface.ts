import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User extends Document {
  @Field()
  readonly email: string;
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
  @Field()
  readonly tokenVersion: number;
}

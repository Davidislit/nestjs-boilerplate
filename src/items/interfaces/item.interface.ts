import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Item extends Document {
  @Field()
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly amount: number;
  @Field()
  readonly category: string;
}

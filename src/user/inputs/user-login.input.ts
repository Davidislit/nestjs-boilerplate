import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}

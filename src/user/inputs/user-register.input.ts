import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegisterInput {
  @Field()
  readonly email: string;
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}

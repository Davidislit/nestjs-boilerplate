import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UserService } from './User.service';
import { User } from './interfaces/user.interface';
import { UserRegisterInput } from './inputs/user-register.input';
import { UserLoginInput } from './inputs/user-login.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { MyContext } from './interfaces/mycontext.interface';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@Context() ctx: MyContext): Promise<User> {
    return this.userService.findById(ctx.payload.userId);
  }

  @Mutation(() => User)
  async register(@Args('user') input: UserRegisterInput): Promise<User> {
    const newUser = await this.userService.register(input);
    return newUser;
  }

  @Mutation(() => String)
  async login(
      @Args('login') login: UserLoginInput,
      @Context() {res}: MyContext
      ): Promise<string> {
    return await this.userService.login(login, res);
  }
}

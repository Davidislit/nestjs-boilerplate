import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema, { User } from './user.schema';
import { UserService } from './User.service';
import { UserResolver } from './user.resolver';
import { AuthService } from './auth.service';
import { RefreshTokenController } from './refresh-token.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
    providers: [UserResolver, UserService, AuthService, ],
    controllers: [RefreshTokenController]
})
export class UserModule {}

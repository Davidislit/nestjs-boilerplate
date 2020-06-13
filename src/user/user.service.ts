import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserRegisterInput } from './inputs/user-register.input';
import { UserLoginInput } from './inputs/user-login.input';
import { compare } from 'bcrypt';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private authService: AuthService,
    ) { }

    async register(newUser: UserRegisterInput): Promise<User> {
        const createItem = new this.userModel(newUser);
        return await createItem.save();
    }

    async login(userInput: UserLoginInput, res: Response): Promise<string> {
        const user = await this.userModel
            .findOne({ username: userInput.username })
            .select('+password');
        const match = await compare(userInput.password, user.password);
        if (match) {
            const accessToken = await this.authService.createAccessToken(user);
            const refreshToken = await this.authService.createRefreshToken(user);
            this.authService.sendRefreshToken(res, refreshToken)
            return accessToken;
        }
        throw new HttpException(
            'Wrong user name or password',
            HttpStatus.BAD_REQUEST,
        );
    }

    async findById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

}
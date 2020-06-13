import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from './interfaces/user.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    async createAccessToken(user: User): Promise<string> {
        return sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        });
    }

    async createRefreshToken(user: User): Promise<string> {
        return sign(
            { userId: user._id, tokenVersion: user.tokenVersion },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d',
            },
        );
    }

    async sendRefreshToken(res: Response, token: string): Promise<void> {
        res.cookie('jid', token, {
            httpOnly: true,
            path: '/refresh_token'
        });
    }
}

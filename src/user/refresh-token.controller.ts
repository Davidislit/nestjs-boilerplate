import { Controller, Post, Req, Res, HttpException, HttpStatus, HttpCode, Get, } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './User.service';
import { AuthService } from './auth.service';
import { RefreshTokenResponse } from './interfaces/refresh-token.interface';

@Controller('refresh_token')
export class RefreshTokenController {
    constructor(private userServier: UserService, private authServier: AuthService) { }
    @Post()
    async refreshToken(@Req() req: Request, @Res() res: Response): Promise<Response<RefreshTokenResponse>> {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;
        try {
            payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

            const user = await this.userServier.findById(payload.userId);

            if (!user) {
                return res.send({ ok: false, accessToken: "" });
            }

            if (user.tokenVersion !== payload.tokenVersion) {
                return res.send({ ok: false, accessToken: "" });
            }

            const refreshToken = await this.authServier.createRefreshToken(user);
            const accessToken = await this.authServier.createAccessToken(user);

            this.authServier.sendRefreshToken(res, refreshToken);

            return res.send({ ok: true, accessToken: accessToken });

        } catch (err) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


}
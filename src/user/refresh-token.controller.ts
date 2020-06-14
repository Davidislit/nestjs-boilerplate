import { Controller, Post, Req, Res, HttpException, HttpStatus, HttpCode, Get, } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './User.service';
import { AuthService } from './auth.service';
import { RefreshTokenResponse } from './interfaces/refresh-token.interface';

@Controller('refresh_token')
export class RefreshTokenController {
    constructor(private userServier: UserService, private authServier: AuthService) {}
    @Post()
    async refreshToken(@Req() req: Request, @Res() res: Response): Promise<Response<RefreshTokenResponse>> {
        const token = req.cookies.jid;
        console.log(`token ${token}`);
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;
        try {
            console.log(`token, process.env.REFRESH_TOKEN_SECRET ${token} ${process.env.REFRESH_TOKEN_SECRET}`)
            payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

            console.log('after verify');

            console.log(`payload:  ${payload.userId}`);
            // token is valid and
            // we can send back an access token
            const user = await this.userServier.findById(payload.userId);

            if (!user) {
                return res.send({ ok: false, accessToken: "" });
            }

            console.log(user);

            // if (user.tokenVersion !== payload.tokenVersion) {
            //     return { ok: false, accessToken: "" };
            // }

            const refreshToken = await this.authServier.createRefreshToken(user);
            const accessToken = await this.authServier.createAccessToken(user);

            this.authServier.sendRefreshToken(res, refreshToken);

            console.log('stuck here?');

        return res.send({ ok: true, accessToken: accessToken });

        } catch (err) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


}
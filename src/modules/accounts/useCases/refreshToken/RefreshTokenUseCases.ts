import jwt, { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayLoad {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCases {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsProvider")
        private dayjsProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = jwt.verify(
            token,
            auth.secret_refresh_token
        ) as IPayLoad;
        const {
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days,
            secret_token,
            expires_in_token,
        } = auth;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const expires_date = this.dayjsProvider.addDays(
            expires_refresh_token_days
        );

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token,
        });

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        const newToken = sign({}, process.env.SECRETKEY || secret_token, {
            subject: user_id,
            expiresIn: expires_in_token,
        });

        return { refresh_token, token: newToken };
    }
}

export { RefreshTokenUseCases };

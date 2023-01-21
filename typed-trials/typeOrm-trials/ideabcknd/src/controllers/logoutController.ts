import { RequestHandler } from "express";
import { isString } from "lodash";
import validator from "validator";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppDataSource from "../data-source";
import { User } from "../entities/User";


const logoutController: RequestHandler = async (req, res, next) => {
    const rToken: string | null = req.cookies?.jwt;

    res.clearCookie("jwt", { httpOnly: true, maxAge: 0 });

    try {
        if (!rToken || !isString(rToken) || !validator.isJWT(rToken)) {
            return res.sendStatus(204);
        }

        const userRepo = AppDataSource.getRepository(User);
        const foundUser = await userRepo.createQueryBuilder("user").where("user.refreshToken = :rToken", { rToken }).addSelect(["user.refreshToken"]).getOne();

        if (!foundUser) {
            /** verify the jwt if verified grab the uname and delete the user's refreshToken */
            jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: JwtPayload) => {
                if (err) return;

                const stolenUser = await userRepo.createQueryBuilder("user").where("user.username = :uname", { uname: decoded.uname }).addSelect("user.refreshToken").getOne();
                if (stolenUser) {
                    await userRepo.update({id: stolenUser.id}, {refreshToken: null});
                }
            })
            return res.sendStatus(204);
        }

        await userRepo.update({id: foundUser.id}, {refreshToken: null});

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export default logoutController;
import { RequestHandler } from "express";
import { isString } from "lodash";
import validator from "validator";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { signAccessTkn } from "../utilities/signJWTs";

const userRepo = AppDataSource.getRepository(User);

const refreshController: RequestHandler = async (req, res, next) => {
    const rToken = req.cookies?.jwt;
    try {
        if (!rToken || !isString(rToken) || !validator.isJWT(rToken)) {
            return res.sendStatus(403);
        }

        //** grab a user with the token if the user is found ? (verify the token if err ? delete the token from the user : send a new access Token) : (verify the token if verified ? delete the user's refresh-token from the db and from the client[jwt-cookie] : none)

        const foundUser = await userRepo.createQueryBuilder("user")
            .where("user.refreshToken = :rToken", { rToken })
            .leftJoinAndSelect("user.profile", "profile")
            .addSelect(["user.refreshToken"])
            .getOne();

        if (!foundUser) {
            jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded: JwtPayload) => {
                if (err) return;
                const hackedUser = await userRepo.createQueryBuilder("user")
                    .where("user.username = :uname", { uname: decoded.uname })
                    .addSelect("user.refreshToken")
                    .getOne();

                if (hackedUser) {
                    hackedUser.refreshToken = "";
                    await userRepo.save(hackedUser);
                    return;
                }
            })

            res.clearCookie("jwt", { httpOnly: true, maxAge: 0 });
            return res.sendStatus(403);
        }

        jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET, async (err) => {
            if (err) {
                foundUser.refreshToken = "";
                await userRepo.save(foundUser);
                res.clearCookie("jwt", {httpOnly: true, maxAge: 0})
                return res.sendStatus(403);
            }

            const accToken = signAccessTkn({username: foundUser.username, firstname: foundUser.profile.firstname, lastname: foundUser.profile.lastname});

            return res.status(200).json({ success: true, accToken });
        })

    } catch (error) { 
        next(error)
    }
}

export default refreshController;
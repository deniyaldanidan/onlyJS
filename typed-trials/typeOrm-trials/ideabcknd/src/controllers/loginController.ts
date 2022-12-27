import { RequestHandler } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import { isString } from "lodash";
import { signAccessTkn, signRefreshTkn } from "../utilities/signJWTs";

const userRepo = AppDataSource.getRepository(User);

type reqBodyType = {
    unameOrEmail: string,
    password: string
}

const loginController: RequestHandler = async (req, res, next) => {
    const { unameOrEmail, password }: reqBodyType = req.body;
    
    try {
        if (!unameOrEmail?.length || !password?.length || !isString(unameOrEmail) || !isString(password)) {
            return res.status(409).json({ error: "Missing some fields" })
        }

        const foundUser = await userRepo.createQueryBuilder("user")
            .where("user.username = :username", { username: unameOrEmail })
            .orWhere("user.email = :email", { email: unameOrEmail })
            .leftJoinAndSelect("user.profile", "profile")
            .addSelect(["user.pwd", "user.refreshToken"])
            .getOne();

        if (!foundUser) {
            return res.status(404).json({ error: "Login Failed" });
        }

        const match = await bcrypt.compare(password, foundUser.pwd);
        if (!match) {
            return res.status(404).json({ error: "Login Failed" });
        }

        const rToken = signRefreshTkn({username: foundUser.username})

        foundUser.refreshToken = rToken;
        await userRepo.save(foundUser);

        const accToken = signAccessTkn({username: foundUser.username, firstname: foundUser.profile.firstname, lastname: foundUser.profile.lastname});

        res.cookie("jwt", rToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 }); // 5hours
        return res.json({ success: true, accToken });
    } catch (error) {
        next(error)
    }

}

export default loginController;
import { RequestHandler } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isString } from "lodash";

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

        const rToken = jwt.sign({ uname: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10m" });

        foundUser.refreshToken = rToken;
        await userRepo.save(foundUser);

        const accToken = jwt.sign({ uname: foundUser.username, fname: foundUser.profile.firstname, lname: foundUser.profile.lastname }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

        res.cookie("jwt", rToken, { httpOnly: true, maxAge: 5 * 60 * 1000 });
        return res.json({ success: true, accToken });
    } catch (error) {
        next(error)
    }

}

export default loginController;
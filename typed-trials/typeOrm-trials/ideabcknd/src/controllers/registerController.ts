import { RequestHandler } from "express";
import AppDataSource from "../data-source";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { isString } from "lodash";
import { signAccessTkn, signRefreshTkn } from "../utilities/signJWTs";

const userRepo = AppDataSource.getRepository(User);
const profileRepo = AppDataSource.getRepository(Profile);

type reqBodyType = {
    uname: string,
    password: string,
    email: string,
    fname: string,
    lname: string,
    location?: string,
    bio?: string
}

// ** uname, password, email, fname, lname are required fields.
// ** location, bio are optional

const registerController: RequestHandler = async (req, res, next) => {
    const { uname, password, email, fname, lname, location, bio }: reqBodyType = req.body;

    if (!uname?.length || !password?.length || !email?.length || !fname?.length || !lname?.length) {
        return res.status(409).json({ error: "Missing some fields" })
    }

    try {

        if (!validator.isEmail(email)) {
            return res.status(409).json({ error: "Invalid Email Field" });
        }

        if (!validator.isStrongPassword(password, { minLength: 10, minSymbols: 2 })) {
            return res.status(409).json({ error: "Password is too weak" });
        }

        if (!validator.isAlphanumeric(uname, "en-US", { ignore: "_-." })) {
            return res.status(409).json({ error: "Invalid username value" })
        }

        if (!validator.isAlpha(fname) || !validator.isAlpha(lname)) {
            return res.status(409).json({ error: "Invalid firstname or lastname value" })
        }

        if (location?.length && !validator.isAlphanumeric(location, "en-US", { ignore: " -_" })) {
            return res.status(409).json({error: "Invalid location value"})
        }

        if (bio?.length && !isString(bio)){
            return res.status(409).json({error: "Invalid bio value"});
        }

        const foundUser = await userRepo.createQueryBuilder("user")
            .where("user.username = :username", { username: uname })
            .orWhere("user.email = :email", { email })
            .getOne();

        if (foundUser) {
            return res.status(409).json({ error: "Username or email already taken" });
        }

        const pwd = await bcrypt.hash(password, 9);
        const rToken = signRefreshTkn({username: uname});
        const myUser = userRepo.create({
            username: uname,
            pwd,
            email,
            refreshToken: rToken
        })
        await userRepo.save(myUser);

        const myProfile = new Profile();
        myProfile.firstname = fname;
        myProfile.lastname = lname;
        location?.length && (myProfile.location = location);
        bio?.length && (myProfile.bio = bio);
        myProfile.user = myUser;
        await profileRepo.save(myProfile);

        const accToken = signAccessTkn({username: uname, firstname: fname, lastname: lname});

        res.cookie("jwt", rToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 }); // 5hours
        return res.json({ success: true, accToken });
    } catch (error) {
        next(error)
    }

}

export default registerController;
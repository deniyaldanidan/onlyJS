import { ErrorRequestHandler, RequestHandler } from "express";
import { EntityNotFoundError, Repository } from "typeorm";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import { isString } from "lodash";

const userRepo:Repository<User> = AppDataSource.getRepository(User);
const profileRepo:Repository<Profile> = AppDataSource.getRepository(Profile);


export const profileView:RequestHandler = async (req, res, next)=>{
    const username = res.locals.uname;

    try {
        const foundProfile:User = await userRepo.createQueryBuilder("user")
            .where("user.username = :username", {username})
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("user.likes", "likes")
            .leftJoinAndSelect("likes.idea", "liked_idea")
            .leftJoinAndSelect("liked_idea.author", "liked_idea_author")
            .leftJoinAndSelect("liked_idea_author.profile", "liked_idea_author_profile")
            .leftJoinAndSelect("user.comments", "comments")
            .leftJoinAndSelect("comments.idea", "commented_idea")
            .leftJoinAndSelect("commented_idea.author", "commented_idea_author")
            .leftJoinAndSelect("commented_idea_author.profile", "commented_idea_author_profile")
            .leftJoinAndSelect("user.ideas", "myIdeas")
            .getOneOrFail()

        const custLikes = foundProfile.likes.map(like=>({...like, idea: {...like.idea, author: {username: like.idea.author.username, name: like.idea.author.profile.firstname + " " + like.idea.author.profile.lastname}}}))

        const custComments = foundProfile.comments.map(comment=>({...comment, idea: {...comment.idea, author: {username: comment.idea.author.username, name: comment.idea.author.profile.firstname + " " + comment.idea.author.profile.lastname}}}))

        return res.json({...foundProfile, likes: custLikes, comments: custComments})

    } catch (error) {
        next(error)
    }

}

export const updateProfile:RequestHandler = async (req, res, next)=>{
    const {firstname, lastname, bio, location} = req.body;
    const username = res.locals.uname;

    if (!isString(firstname) || !firstname.length || !isString(lastname) || !lastname.length){
        return res.status(400).json({error: "Invalid Values"})
    }

    if (bio){
        if (!isString(bio)){
            return res.status(400).json({error: "Invalid values"})
        }
    }

    if (location){
        if (!isString(location)){
            return res.status(400).json({error: "Invalid Values"})
        }
    }

    try {
        const foundProfile:Profile = await profileRepo.createQueryBuilder("profile")
            .leftJoinAndSelect("profile.user", "user")
            .where("user.username = :username", {username})
            .getOneOrFail();

        foundProfile.firstname = firstname;
        foundProfile.lastname = lastname;
        bio?.length && (foundProfile.bio = bio);
        location?.length && (foundProfile.location = location);

        await profileRepo.save(foundProfile);

        return res.json(foundProfile);
    } catch (error) {
        next(error);
    }
}

export const profileErrorHandler:ErrorRequestHandler = (error, req, res, next)=>{
    if (error instanceof EntityNotFoundError){
        return res.status(404).json({error: "User not found"})
    }
    next(error);
}
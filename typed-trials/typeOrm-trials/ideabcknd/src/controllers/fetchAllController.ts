import { RequestHandler } from "express";
import AppDataSource from "../data-source";
import { Idea } from "../entities/Idea";
import { User } from "../entities/User";
import cmtOutputFormater from "../utilities/cmtOutputFormater";
import likeOutputFormater from "../utilities/likeOutputFormatter";

const ideaRepo = AppDataSource.getRepository(Idea);
const userRepo = AppDataSource.getRepository(User);

export const fetchAllIdeas: RequestHandler = async (req, res, next) => {
    try {
        const result:Array<Idea> = await ideaRepo.createQueryBuilder("idea")
            .select()
            .leftJoinAndSelect("idea.author", "author")
            .leftJoinAndSelect("author.profile", "author_profile")
            .leftJoinAndSelect("idea.likes", "likes")
            .leftJoinAndSelect("likes.liked_by", "liked_by")
            .leftJoinAndSelect("idea.comments", "comments")
            .leftJoinAndSelect("comments.commented_by", "commented_by")
            .leftJoinAndSelect("commented_by.profile", "commentor.profile")
            .getMany();

        const ideas = result.map(idea=>{
            const author = {username: idea.author.username, fullName: idea.author.profile.firstname + " " + idea.author.profile.lastname, bio: idea.author.profile.bio, location: idea.author.profile.location};
            const likes = idea.likes.map(like=>likeOutputFormater(like));
            const comments = idea.comments.map(cmt=>cmtOutputFormater(cmt, cmt.commented_by))

            return {...idea, author, likes, comments}
        })

        return res.json(ideas);
    } catch (error) {
        next(error)
    }
}

export const fetchAllUser: RequestHandler = async (req, res, next) => {
    try {
        const result = await userRepo.createQueryBuilder("user").select().leftJoinAndSelect("user.profile", "profile").getMany();

        return res.json(result.map(user=>({username: user.username, joined_date: user.joined_date, profile: user.profile})));
    } catch (error) {
        next(error)
    }
}
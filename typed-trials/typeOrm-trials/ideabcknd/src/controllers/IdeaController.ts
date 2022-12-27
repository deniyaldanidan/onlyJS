import { RequestHandler } from "express";
import { isSafeInteger } from "lodash";
import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Idea } from "../entities/Idea";

const ideaRepo: Repository<Idea> = AppDataSource.getRepository(Idea);

export const getAllIdeas: RequestHandler = async (req, res, next) => {
    const page = req.query.page as string;
    const perPage = 10;
    let curr_page: number;
    if (page && isSafeInteger(parseInt(page))) {
        curr_page = parseInt(page)
        if (curr_page<=0){
            curr_page=1
        }
    } else {
        curr_page = 1
    }

    try {
        const result: [Idea[], number] = await ideaRepo.createQueryBuilder("idea")
            .select()
            .leftJoinAndSelect("idea.author", "author")
            .leftJoinAndSelect("author.profile", "profile")
            .leftJoinAndSelect("idea.comments", "comments")
            .leftJoinAndSelect("idea.likes", "likes")
            .skip(perPage * (curr_page - 1))
            .take(perPage)
            .getManyAndCount()

        const allIdeas = result[0].length ? result[0].map(idea => {
            const newIdea = {
                ...idea,
                likes: idea.likes.filter(like => like?.like_value === "like").length,
                unlikes: idea.likes.filter(like => like?.like_value === "unlike").length,
                comments: idea.comments.length,
                author: { username: idea.author.username, name: idea.author.profile.firstname + " " + idea.author.profile.lastname }
            }
            return newIdea;
        }) : result[0]

        const total = result[1];
        const next_page:(number|boolean) = (perPage*curr_page) < total && curr_page+1;
        const total_pages = Math.round(total/perPage);
        const previous_page = curr_page<=total_pages ? (curr_page > 1 && curr_page-1) : total_pages;
        
        res.json({
            total,
            curr_page,
            previous_page,
            next_page,
            total_pages,
            ideas: allIdeas
        });
    } catch (error) {
        next(error)
    }
}
import { ErrorRequestHandler, RequestHandler } from "express";
import { isSafeInteger, isString } from "lodash";
import { EntityNotFoundError, Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Idea } from "../entities/Idea";
import { User } from "../entities/User";
import validator from "validator";
import cmtOutputFormater, { formattedComment } from "../utilities/cmtOutputFormater";
import likeOutputFormater, { formattedLike } from "../utilities/likeOutputFormatter";

const ideaRepo: Repository<Idea> = AppDataSource.getRepository(Idea);
const userRepo: Repository<User> = AppDataSource.getRepository(User);

export const getAllIdeas: RequestHandler = async (req, res, next) => {
    const page = req.query.page as string;
    const authorParam = req.query.author as string;
    let titleParam = req.query.title as string;
    const perPage = 10;
    let curr_page: number;


    if (!isString(titleParam) || !validator.isAlphanumeric(titleParam)) {
        titleParam = ""
    }

    if (page && isSafeInteger(parseInt(page))) {
        curr_page = parseInt(page)
        if (curr_page <= 0) {
            curr_page = 1
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
            .where(() => {
                if (authorParam?.length) {
                    return "author.username = :username"
                } else {
                    return ""
                }
            })
            .setParameter("username", authorParam)
            .andWhere("lower(idea.title) like lower(:title)", { title: `%${titleParam}%` })
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
        const next_page: (number | boolean) = (perPage * curr_page) < total && curr_page + 1;
        const total_pages = Math.ceil(total / perPage);
        const previous_page = curr_page <= total_pages ? (curr_page > 1 && curr_page - 1) : total_pages;

        res.json({
            total_ideas: total,
            per_page: perPage,
            total_pages,
            curr_page,
            previous_page,
            next_page,
            ideas: allIdeas
        });

    } catch (error) {
        next(error)
    }
}

export const getOneIdea: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {

        if (!isSafeInteger(parseInt(id))) {
            return res.status(404).json({ error: "Requested Idea not found" })
        }

        const result = await ideaRepo.createQueryBuilder("idea")
            .where("idea.id = :id", { id })
            .leftJoinAndSelect("idea.author", "author")
            .leftJoinAndSelect("author.profile", "profile")
            .leftJoinAndSelect("idea.likes", "likes")
            .leftJoinAndSelect("likes.liked_by", "liked_by")
            .leftJoinAndSelect("idea.comments", "comments")
            .leftJoinAndSelect("comments.commented_by", "commented_by")
            .leftJoinAndSelect("commented_by.profile", "commenter_profile")
            .getOneOrFail();

        const authorInfo = {
            username: result.author.username,
            name: result.author.profile.firstname + " " + result.author.profile.lastname,
            bio: result.author.profile?.bio,
            location: result.author.profile?.location
        }

        const likes:Array<formattedLike> = result.likes.map(like => likeOutputFormater(like) );

        const n_likes = result.likes.filter(like => like.like_value === "like").length;
        const n_unlikes = result.likes.filter(like => like.like_value === "unlike").length;

        const comments:Array<formattedComment> = result.comments.map(cmt => cmtOutputFormater(cmt, cmt.commented_by))

        const fetchedIdea = { ...result, author: authorInfo, n_likes, n_unlikes, likes, comments }
        return res.json(fetchedIdea);
    } catch (error) {
        next(error)
    }
}

export const createIdea: RequestHandler = async (req, res, next) => {
    const { title, description } = req.body;
    const username = res.locals.uname;
    try {
        if (!isString(title) || !isString(description)) {
            return res.status(400).json({ error: "Invalid Values" })
        }
        const author: User = await userRepo.findOneBy({ username });
        const newIdea: Idea = ideaRepo.create({ title, description, author });
        await ideaRepo.save(newIdea);
        return res.json(newIdea);
    } catch (error) {
        next(error);
    }
}

export const updateIdea: RequestHandler = async (req, res, next) => {
    const { id, title, description } = req.body;
    const username = res.locals.uname;
    try {
        if (!isSafeInteger(parseInt(id)) || !isString(title) || !isString(description)) {
            return res.status(400).json({ error: "Invalid values" });
        }
        const foundIdea = await ideaRepo.createQueryBuilder("idea")
            .leftJoinAndSelect("idea.author", "author")
            .where("idea.id = :id and author.username = :username", { id: id, username: username })
            .getOneOrFail();

        foundIdea.title = title;
        foundIdea.description = description;
        await ideaRepo.save(foundIdea);

        return res.json(foundIdea);
    } catch (error) {
        next(error)
    }
}

export const deleteIdea: RequestHandler = async (req, res, next) => {
    const id = req.params.id as string;
    const username = res.locals.uname;

    try {
        if (!isSafeInteger(parseInt(id))) {
            return res.status(400).json({ error: "Invalid Values" })
        }

        const foundIdea = await ideaRepo.createQueryBuilder("idea")
            .leftJoinAndSelect("idea.author", "author")
            .where("idea.id = :id and author.username = :username", { id: id, username: username })
            .getOneOrFail();

        await ideaRepo.remove(foundIdea);

        return res.json({ success: true });
    } catch (error) {
        next(error)
    }
}

export const ideaErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof EntityNotFoundError) {
        return res.status(404).json({ error: "Requested Idea not found" })
    }
    next(err);
}
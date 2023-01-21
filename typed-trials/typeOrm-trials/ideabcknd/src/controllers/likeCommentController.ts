import { ErrorRequestHandler, RequestHandler } from "express";
import { isNumber, isSafeInteger, isString } from "lodash";
import { EntityNotFoundError, Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Idea } from "../entities/Idea";
import { MyComment } from "../entities/MyComment";
import { MyLike, typeLikeValue } from "../entities/MyLike";
import { User } from "../entities/User";
import cmtOutputFormater from "../utilities/cmtOutputFormater";
import likeOutputFormater from "../utilities/likeOutputFormatter";


const likeRepo: Repository<MyLike> = AppDataSource.getRepository(MyLike);
const ideaRepo: Repository<Idea> = AppDataSource.getRepository(Idea);
const userRepo: Repository<User> = AppDataSource.getRepository(User);
const commentRepo: Repository<MyComment> = AppDataSource.getRepository(MyComment);

export const likeController: RequestHandler = async (req, res, next) => {
    const { like_val, ideaId } : { like_val: typeLikeValue, ideaId: number } = req.body;
    const username: string = res.locals.uname;

    if (!(["like", "unlike"].includes(like_val)) || !isSafeInteger(ideaId)) {
        return res.status(400).json({ error: "fields are missing" })
    }

    try {
        const foundLike = await likeRepo.createQueryBuilder("like")
            .leftJoinAndSelect("like.idea", "idea")
            .leftJoinAndSelect("like.liked_by", 'user')
            .where("user.username = :username", { username })
            .andWhere("idea.id = :ideaId", { ideaId })
            .getOne();

        if (foundLike) {
            const like_id = foundLike.id;
            if (foundLike.like_value === like_val) {
                await likeRepo.remove(foundLike);
                return res.json({ operation: "delete", like_id })
            } else {
                foundLike.like_value = like_val;
                await likeRepo.save(foundLike);
                return res.json({ operation: "update", likeObj: likeOutputFormater(foundLike) })
            }
        }

        //! if like does not exist yet!!!
        const ideaObj: Idea = await ideaRepo.createQueryBuilder("idea").where("idea.id = :ideaId", { ideaId }).leftJoinAndSelect("idea.likes", "likes").leftJoinAndSelect("likes.liked_by", "liked_by").getOneOrFail();

        const userObj: User = await userRepo.createQueryBuilder("user").where("user.username = :username", { username }).getOneOrFail();

        const newLike: MyLike = new MyLike();
        newLike.like_value = like_val;
        newLike.liked_by = userObj;
        newLike.idea = ideaObj;
        await likeRepo.save(newLike);

        return res.json({ operation: "create", likeObj: likeOutputFormater(newLike) })
    } catch (error) {
        next(error)
    }
}


export const createComment: RequestHandler = async (req, res, next) => {
    const { commentContent, idea_id } = req.body;
    const username = res.locals.uname;

    if (!isString(commentContent) || !commentContent.length || !isSafeInteger(idea_id)) {
        return res.status(400).json({ error: "invalid values" })
    }

    try {
        const userObj: User = await userRepo.findOneOrFail({ where: { username }, relations: { profile: true } });
        const ideaObj: Idea = await ideaRepo.findOneByOrFail({ id: idea_id });

        const newComment: MyComment = new MyComment();
        newComment.comment = commentContent;
        newComment.commented_by = userObj;
        newComment.idea = ideaObj;
        await commentRepo.save(newComment);

        return res.json({ newComment: cmtOutputFormater(newComment, userObj) });

    } catch (error) {
        next(error)
    }
}

export const updateComment: RequestHandler = async (req, res, next) => {
    const { id, commentContent, idea_id } = req.body;
    const username = res.locals.uname;

    if (!isString(commentContent) || !commentContent.length || !isSafeInteger(id) || !isSafeInteger(idea_id)  ) {
        return res.status(400).json({ error: "invalid values" })
    }

    try {
        const foundComment: MyComment = await commentRepo.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.commented_by", "commented_by")
            .leftJoinAndSelect("comment.idea", "idea")
            .where("comment.id = :id", { id })
            .andWhere("commented_by.username = :username", { username })
            .andWhere("idea.id = :idea_id", { idea_id })
            .leftJoinAndSelect("commented_by.profile", "profile")
            .getOneOrFail()

        foundComment.comment = commentContent;
        await commentRepo.save(foundComment);

        return res.json({ updatedComment: cmtOutputFormater(foundComment, foundComment.commented_by) })
    } catch (error) {
        next(error);
    }
}

export const deleteComment: RequestHandler = async (req, res, next) => {
    const {id, idea_id} = req.body;
    const username = res.locals.uname;

    if (!isSafeInteger(id) || !isSafeInteger(idea_id)) {
        return res.status(400).json({ error: "invalid values" })
    }

    try {
        const foundComment: MyComment = await commentRepo.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.commented_by", "commented_by")
            .leftJoinAndSelect("comment.idea", "idea")
            .where("comment.id = :id", { id })
            .andWhere("commented_by.username = :username", { username })
            .andWhere("idea.id = :idea_id", { idea_id })
            .getOneOrFail();

        await commentRepo.remove(foundComment);

        return res.json({success: true, commentId: id})
    } catch (error) {
        next(error)
    }
}

export const likeCommentErrorHandler:ErrorRequestHandler = (error, req, res, next)=>{
    if (error instanceof EntityNotFoundError) {
        return res.status(400).json({ error: "Invalid Values are supplied" })
    }
    next(error)
}
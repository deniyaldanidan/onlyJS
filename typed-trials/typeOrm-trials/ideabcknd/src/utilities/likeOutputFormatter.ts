import { MyLike } from "../entities/MyLike";

export type formattedLike = {
    id: number,
    like_value: string,
    liked_by: string
}

/**
 * @description format the like-object
 * @param like - It should have liked_by relation switched on to fetch username
 * @returns - formatted like value
 */
const likeOutputFormater = (like:MyLike):formattedLike=>{
    return {
        id: like.id,
        like_value: like.like_value,
        liked_by: like.liked_by.username
    }
}

export default likeOutputFormater;
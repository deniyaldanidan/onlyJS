import { like_value_type, likeType } from '../api/apiSliceHelper';

type likeCreate = {
    operation: "create",
    likeObj: likeType
}

type likeUpdate = {
    operation: "update",
    likeObj: likeType
}


type likeDelete = {
    operation: "delete",
    likeId: number
}

export type postLikeReturnType = likeCreate | likeUpdate | likeDelete;

export type postLikePayload = {
    like_val: like_value_type,
    ideaId: number
}

export type createCommentPayload = { commentContent: string, idea_id: number }
export type updateCommentPayload = createCommentPayload & { id: number }
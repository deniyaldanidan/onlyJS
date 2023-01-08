export type likeType = {
    id: number,
    like_value: "like" | "unlike",
    liked_by: string
}

export type commentType = {
    id: number,
    comment: string,
    commented_by: {
        commenter_username: string,
        commenter_name: string
    },
    commented_on: string,
    last_edited: string
}

export type fetchAllIdeaType = {
    id: number,
    title: string,
    description: string,
    created_date: string,
    updated_date: string,
    author: {
        username: string,
        fullName: string,
        bio?: string,
        location?: string
    },
    likes: Array<likeType>,
    comments: Array<commentType>
}

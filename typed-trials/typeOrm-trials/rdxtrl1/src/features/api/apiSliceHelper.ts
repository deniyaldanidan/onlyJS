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


export type ideaViewType = fetchAllIdeaType & {
    author: {
        username: string,
        name: string,
        bio?: string,
        location?: string
    }
}

export type addIdeaInp = {
    title: string,
    description: string,
    acc_tkn: string
}

export type EditIdeaInp = addIdeaInp & {id:number}

export type fetchAllUsersResType = {
    username: string,
    joined_date: string,
    profile: {
        id: number,
        firstname: string,
        lastname: string,
        bio?: string,
        location?: string
    }
}

export type fetchAllUsersType = fetchAllUsersResType & {
    fullname: string
}
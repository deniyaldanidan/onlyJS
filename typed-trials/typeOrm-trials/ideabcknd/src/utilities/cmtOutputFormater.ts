import { MyComment } from "../entities/MyComment";
import { User } from "../entities/User";

export type formattedComment = {
    id: number;
    comment: string;
    commented_by: {
        commenter_username: string;
        commenter_name: string;
    };
    commented_on: string;
    last_edited: string;
}

const cmtOutputFormater = (cmt: MyComment, user:User):formattedComment=>{
    const cust_commented_by = {
        commenter_username: user.username,
        commenter_name: user.profile.firstname + " " + user.profile.lastname
    };

    return { id: cmt.id, comment: cmt.comment, commented_by: cust_commented_by, commented_on: cmt.commented_on, last_edited: cmt.last_edited}
}

export default cmtOutputFormater;
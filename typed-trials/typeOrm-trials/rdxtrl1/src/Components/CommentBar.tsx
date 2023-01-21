import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { commentType } from "../features/api/apiSliceHelper";

type props = {
    comm: commentType,
    isAuth: boolean,
    editFunc: (id: number, content: string) => void,
    deleteFunc: (id: number) => void,
    myUsername: string | false
}

type componentTy = (props: props) => JSX.Element;

const CommentBar: componentTy = ({ comm, isAuth, editFunc, deleteFunc, myUsername }) => {
    return (
        <div className="comment-sec" key={comm.id}>
            <Link to={`/view-profile/${comm.commented_by.commenter_username}`} className="commented-by">{comm.commented_by.commenter_name}</Link>
            <div className="comment-date-meta">
                <div className="comment-created"> commented {formatDistanceToNow(new Date(comm.commented_on), { addSuffix: true })}</div>
                <div className="comment-edited">edited {formatDistanceToNow(new Date(comm.last_edited), { addSuffix: true })}</div>
            </div>
            <div className="comment-content">{comm.comment}</div>
            {(isAuth && myUsername === comm.commented_by.commenter_username) ? (
                <div className="comment-sec-links">
                    <div onClick={() => editFunc(comm.id, comm.comment)}>edit</div>
                    <div onClick={() => deleteFunc(comm.id)} >delete</div>
                </div>
            ) : ""}
        </div>
    )
}

export default CommentBar;
import { formatDistanceToNow } from "date-fns";
import { isString } from "lodash";
import { useEffect } from "react";
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike, AiOutlineEnvironment } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDeleteIdeaMutation, useGetOneIdeaQuery } from "../features/api/apiSlice";
import validator from "validator";
import '../styles/idea-view.scss';


const IdeaView = (): JSX.Element => {
    const { id: ideaId } = useParams();
    const [deleteIdea] = useDeleteIdeaMutation();
    const { data: idea, isLoading, isError, isSuccess, error } = useGetOneIdeaQuery(parseInt(ideaId as string) || 1);
    const { isAuth, username, access_token } = useAppSelector(state => state.auth.data);
    const navigate = useNavigate();

    useEffect(() => {
        // isSuccess && console.log(idea);
        isError && console.log(error);
    }, [isSuccess, idea, isError, error])

    if (isLoading) {
        return <div className="info-bar">Fetching the idea</div>
    }

    if (isError) {
        return <div className="info-bar danger">Error Happened in View-Page</div>
    }

    const likes = idea?.likes.filter(like => like?.like_value === "like") || [];
    const unlikes = idea?.likes.filter(like => like?.like_value === "unlike") || [];

    const editHandler = () => {
        navigate("/edit-idea", { state: { idea: { id: idea?.id, title: idea?.title, description: idea?.description } } })
    }

    const deleteHandler = async () => {
        if (idea === undefined || !isAuth || !isString(access_token) || !validator.isJWT(access_token)) {
            return;
        }
        try {
            await deleteIdea({ id: idea.id, acc_token: access_token }).unwrap();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return idea !== undefined ? (
        <div className="idea-view">
            {
                (isAuth && username === idea.author.username) ? (
                    <div className="view-links">
                        <div className="btn" onClick={editHandler} >Edit</div>
                        <div className="btn danger" onClick={deleteHandler}>Delete</div>
                    </div>
                ) : ""
            }
            <div className="idea-title">{idea.title}</div>
            <div className="meta-col-1">
                <Link to="/" className="meta author-meta">written by {idea.author.name}</Link>
                <div className="meta">published {formatDistanceToNow(new Date(idea.created_date), { addSuffix: true })}</div>
                <div className="meta">updated {formatDistanceToNow(new Date(idea.updated_date), { addSuffix: true })}</div>
            </div>
            <div className="description">{
                idea.description.split("\n").map((para, index) => <span key={index}>{para}</span>)
            }</div>
            <div className="about-author">
                <div className="author-name">{idea.author.name}</div>
                <div className="author-location"><AiOutlineEnvironment /> {idea.author?.location || "Somewhere"}</div>
                <div className="author-bio">{idea.author?.bio}</div>
                <div className="view-profile">view author's profile</div>
            </div>
            <div className="counts-meta">
                <div className="icon-meta">{likes.length}<AiOutlineLike /></div>
                <div className="icon-meta">{unlikes.length}<AiOutlineDislike /></div>
                <div className="icon-meta">{idea?.comments?.length || 0}<AiOutlineComment /></div>
            </div>
            <div className="comments-section">
                <div className="comments-sec-head">Comments</div>
                {
                    idea?.comments?.length ? (
                        <div className="comments-list">
                            {
                                idea.comments.map(comm => (
                                    <div className="comment-sec" key={comm.id}>
                                        <Link to={`/view-profile/${comm.commented_by.commenter_username}`} className="commented-by">{comm.commented_by.commenter_name}</Link>
                                        <div className="comment-date-meta">
                                            <div className="comment-created"> commented {formatDistanceToNow(new Date(comm.commented_on), { addSuffix: true })}</div>
                                            <div className="comment-edited">edited {formatDistanceToNow(new Date(comm.last_edited), { addSuffix: true })}</div>
                                        </div>
                                        <div className="comment-content">{comm.comment}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : <div className="info-bar sm">No comments yet</div>
                }
            </div>
        </div>
    ) : <div className="info-bar danger">Error Happened</div>
}

export default IdeaView;
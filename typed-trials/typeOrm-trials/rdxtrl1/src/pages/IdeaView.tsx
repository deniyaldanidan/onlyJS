import { formatDistanceToNow } from "date-fns";
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetOneIdeaQuery } from "../features/api/apiSlice";




const IdeaView = (): JSX.Element => {
    const { id: ideaId } = useParams();
    console.log(ideaId)
    const { data: idea, isLoading, isError } = useGetOneIdeaQuery(parseInt(ideaId as string) || 1);


    if (isLoading) {
        return <div className="info-bar">Fetching the idea</div>
    }

    if (isError) {
        return <div className="info-bar danger">Error Happened</div>
    }

    const likes = idea?.likes.filter(like => like?.like_value === "like") || [];
    const unlikes = idea?.likes.filter(like => like?.like_value === "unlike") || [];

    return idea !== undefined ? (
        <div className="idea-view">
            <div className="idea-title">{idea.title}</div>
            <div className="meta-col-1">
                <Link to="/" className="author-meta">{idea.author.fullName}</Link>
                <div className="published-meta">{formatDistanceToNow(new Date(idea.created_date), { addSuffix: true })}</div>
                <div className="edited-meta">{formatDistanceToNow(new Date(idea.updated_date), { addSuffix: true })}</div>
            </div>
            <div className="description">{idea.description}</div>
            <div className="about-author">
                <div className="author-name">{idea.author.fullName}</div>
                <div className="author-location">{idea.author?.location || "Somewhere"}</div>
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
                                        <div className="commented-by">{comm.commented_by.commenter_name}</div>
                                        <div className="comment-date-meta">
                                            <div className="comment-created">{comm.commented_on}</div>
                                            <div className="comment-edited">{comm.last_edited}</div>
                                        </div>
                                        <div className="comment-content">{comm.comment}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : <div className="info-bar">No comments yet</div>
                }
            </div>
        </div>
    ) : <div className="info-bar danger">Error Happened</div>
}

export default IdeaView;
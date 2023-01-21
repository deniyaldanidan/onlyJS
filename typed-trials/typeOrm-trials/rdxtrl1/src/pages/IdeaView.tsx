import { formatDistanceToNow } from "date-fns";
import { isSafeInteger } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike, AiOutlineEnvironment, AiFillLike, AiFillDislike } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CommentBar from "../Components/CommentBar";
import { useDeleteIdeaMutation, useGetOneIdeaQuery } from "../features/api/apiSlice";
import { commentType, like_value_type } from "../features/api/apiSliceHelper";
import { useCreateCommentMutation, useDeleteCommentMutation, usePostLikeMutation, useUpdateCommentMutation } from "../features/like/likeCommentSlice";
import '../styles/idea-view.scss';


const IdeaView = (): JSX.Element => {
    const { id: ideaId } = useParams();
    const { data: idea, isError, isSuccess, error } = useGetOneIdeaQuery(parseInt(ideaId as string) || 1);
    
    const [deleteIdea] = useDeleteIdeaMutation();
    
    const [postLike] = usePostLikeMutation();
    
    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    
    const { isAuth, username } = useAppSelector(state => state.auth.data);
    
    const navigate = useNavigate();
    
    const [commentContent, setCommentContent] = useState<string>("");
    const [commId, setCommId] = useState<number|false>(false);
    const [commEdit, setCommEdit] = useState<boolean>(false);

    const sortedComments:commentType[] | undefined = useMemo(()=>{
        const sorted = idea?.comments.slice();
        sorted?.sort((a,b)=>b.last_edited.localeCompare(a.last_edited))
        return sorted;
    }, [idea])

    const likes = idea?.likes.filter(like => like?.like_value === "like") || [];
    const unlikes = idea?.likes.filter(like => like?.like_value === "unlike") || [];
    const myLikeValue = idea?.likes.find(like => like.liked_by === username) || false;
    const isILiked = myLikeValue && myLikeValue.like_value === "like";
    const isIDisLiked = myLikeValue && myLikeValue.like_value === "unlike";

    useEffect(() => {
        // isSuccess && console.log(idea);
        isError && console.log(error);
    }, [isSuccess, idea, isError, error])

    if (isError) {
        return <div className="info-bar danger">Error Happened in View-Page</div>
    }


    const handleLike = async (like_val: like_value_type) => {
        if (!isAuth || idea === undefined) return;
        try {
            await postLike({ like_val, ideaId: idea.id }).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    const editHandler = () => {
        navigate("/edit-idea", { state: { idea: { id: idea?.id, title: idea?.title, description: idea?.description } } })
    }

    const deleteHandler = async () => {
        if (idea === undefined) {
            return;
        }
        try {
            await deleteIdea({ id: idea.id }).unwrap();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const commSubmitHndlr = async()=>{
        if (!isAuth || idea === undefined) return;
        try {
            if (commEdit && isSafeInteger(commId)){
                await updateComment({id: commId as number, commentContent, idea_id: idea.id})
            } else{
                await createComment({commentContent, idea_id: idea.id})
            }
            setCommentContent("")
            setCommEdit(false);
            setCommId(false);
        } catch (error) {
            console.log(error)
        }
    };
    const commCancelHndlr = ()=>{
        if (!isAuth || idea === undefined) return;
        setCommentContent("");
        setCommEdit(false);
        setCommId(false);
    };

    const editCommHndlr = (id:number, content:string)=>{
        if (!isAuth || idea === undefined) return;
        setCommId(id);
        setCommentContent(content);
        setCommEdit(true);
    }

    const deleteCommHndlr = async (id:number)=>{
        if (!isAuth || idea === undefined) return;
        try {
            await deleteComment({id, idea_id:idea.id})
        } catch (error) {
            console.log(error)
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
                <div className={`icon-meta ${isAuth ? "clickable" : ""}`} onClick={() => handleLike("like")} >{likes.length} {isILiked ? <AiFillLike /> : <AiOutlineLike />}</div>
                <div className={`icon-meta ${isAuth ? "clickable" : ""}`} onClick={() => handleLike("unlike")} >{unlikes.length}{isIDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}</div>
                <div className="icon-meta">{idea?.comments?.length || 0}<AiOutlineComment /></div>
            </div>
            <div className="comments-section">
                {
                    isAuth ? (
                        <div className="comment-form">
                            <div className="comment-form-head">Add Comment</div>
                            <textarea value={commentContent} onChange={e=>{setCommentContent(e.target.value)}}></textarea>
                            <div className="btn-grps">
                                <button type="button" className="submit" onClick={commSubmitHndlr}>Comment</button>
                                <button type="button" className="cancel" onClick={commCancelHndlr}>Cancel</button>
                            </div>
                        </div>
                    ) : ""
                }
                <div className="comments-sec-head">Comments</div>
                {
                    sortedComments?.length ? (
                        <div className="comments-list">
                            {sortedComments.map(comm => <CommentBar key={comm.id} comm={comm} isAuth={isAuth} myUsername={username} editFunc={editCommHndlr} deleteFunc={deleteCommHndlr} />)}
                        </div>
                    ) : <div className="info-bar sm">No comments yet</div>
                }
            </div>
        </div>
    ) : <div className="info-bar">Fetching Idea</div>
}

export default IdeaView;
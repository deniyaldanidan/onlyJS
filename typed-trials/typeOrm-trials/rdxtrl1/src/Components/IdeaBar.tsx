import {capitalize} from 'lodash';
import { Link } from 'react-router-dom';
import { fetchAllIdeaType } from '../features/api/apiSliceHelper';
import {formatDistanceToNow} from 'date-fns';
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

type IdeaBarProps = {
    idea: fetchAllIdeaType
}

const IdeaBar: (props: IdeaBarProps) => JSX.Element = ({ idea }) => {
    
    const published:string = formatDistanceToNow(new Date(idea.created_date), {addSuffix: true});
    const edited:string = formatDistanceToNow(new Date(idea.updated_date), {addSuffix: true});
    const likes:number = idea.likes.filter(like=>like?.like_value==="like").length;
    const unlikes:number = idea.likes.filter(like=>like?.like_value==="unlike").length;
    const comments:number = idea.comments.length;

    return (
        <div className="idea-bar">
            <div className="bar-top-sec">
                <Link to={`/idea/${idea.id}`}>{idea.title}</Link>
            </div>
            <div className="bar-mid-sec">
                <div className="author-meta">
                    by <Link to="/">{capitalize(idea.author.fullName)}</Link>
                </div>
                <div className="published-meta">published {published}</div>
                <div className="edited-meta">last edited {edited}</div>
            </div>
            <div className="bar-btm-sec">
                <div className="icon-meta">{likes}<AiOutlineLike/></div>
                <div className="icon-meta">{unlikes}<AiOutlineDislike/></div>
                <div className="icon-meta">{comments}<AiOutlineComment/></div>
            </div>
        </div>
    )
}


export default IdeaBar;
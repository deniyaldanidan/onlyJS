import { IdeaType, deleteIdea } from "../features/ideas/IdeaSlice";
import {capitalize} from 'lodash';
import {MdOutlineDelete, MdOutlineEdit} from 'react-icons/md'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type IdeaBarProps = {
    idea: IdeaType
}

const IdeaBar: (props: IdeaBarProps) => JSX.Element = ({ idea }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editHandler = ()=>{
        navigate("/edit-idea", {
            state: {
                idea
            }
        })
    }

    const deleteHandler = ()=>{
        dispatch(deleteIdea(idea.id));
    }
    
    return (
        <div className="idea-bar">
            <div className="bar-top-sec">
                <div className="left-sec">{idea.title}</div>
                <div className="right-sec">
                    <div className="opt" onClick={editHandler}><MdOutlineEdit/></div>
                    <div className="delete-opt opt" onClick={deleteHandler}><MdOutlineDelete/></div>
                </div>
            </div>
            <div className="bar-btm-sec">
                <div className="author-meta">
                    Written By {capitalize(idea.author)}
                </div>
            </div>
        </div>
    )
}


export default IdeaBar;
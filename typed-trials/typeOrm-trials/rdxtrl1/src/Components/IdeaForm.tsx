import { FormEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addIdea, editIdea, IdeaType} from '../features/ideas/IdeaSlice';
import '../styles/my-form.scss';

type IdeaFormProp = {
    initialTitle?: IdeaType['title'],
    edit?: boolean,
    ideaId?: IdeaType['id']
}

const IdeaForm:(props:IdeaFormProp)=>JSX.Element = ({initialTitle, edit, ideaId})=>{

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [title, setTitle] = useState<IdeaType['title']>("");
    const [err, setErr] = useState("");

    useEffect(()=>{
        if (edit){
            if (initialTitle !== undefined && initialTitle.length){
                setTitle(initialTitle)
            }
        }
    }, [edit, initialTitle])

    useEffect(()=>{
        setErr("")
    }, [title])


    const submitHandler:FormEventHandler<HTMLFormElement> = e=>{
        e.preventDefault();
        setErr("");
        if (!title.length) {
            setErr("Fields are missing")
            return 
        }
        if (!edit) dispatch(addIdea(title, "Anonymous"))
        if (edit && ideaId !== undefined) dispatch(editIdea({id: ideaId, title}))
        setTitle("");
        console.log("Form is Submitted")
        navigate("/")
    }

    const cancelHandler = ()=>{
        setErr("")
        setTitle("")
        console.log("Cancel btn is clicked")
        navigate("/")
    }

    return (
        <div className="my-form">
            <div className="form-title">{edit ? "Edit" : "Add"} Idea</div>
            <div className="error">{err}</div>
            <form onSubmit={submitHandler}>
                <div className="inp-grp">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={e=>{setTitle(e.target.value)}} placeholder="Enter your Idea's title here" />
                </div>
                <div className="btns-grp">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default IdeaForm;
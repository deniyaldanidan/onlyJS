import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/my-form.scss';
import { addIdeaInp, EditIdeaInp } from "../features/api/apiSliceHelper";
import { useAddNewIdeaMutation, useEditIdeaMutation } from "../features/api/apiSlice";

type IdeaFormProp = {
    initialTitle?: addIdeaInp['title'],
    initialDescription?: addIdeaInp['description'],
    edit?: boolean,
    ideaId?: EditIdeaInp['id'];
}

const IdeaForm: (props: IdeaFormProp) => JSX.Element = ({ initialTitle, edit, ideaId, initialDescription }) => {

    const navigate = useNavigate();
    const [addNewIdea] = useAddNewIdeaMutation();
    const [editIdea] = useEditIdeaMutation();

    const [title, setTitle] = useState<addIdeaInp['title']>("");
    const [description, setDescription] = useState<addIdeaInp['description']>("");
    const [err, setErr] = useState("");

    useEffect(() => {
        if (edit) {
            if (initialTitle !== undefined && initialTitle.length) {
                setTitle(initialTitle)
            }
            if (initialDescription !== undefined && initialDescription.length){
                setDescription(initialDescription)
            }
        }
    }, [edit, initialTitle, initialDescription])

    useEffect(() => {
        setErr("")
    }, [title])


    const submitHandler: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        setErr("");
        if (!title.length) {
            setErr("Fields are missing")
            return
        }
        try {
            if (!edit) {
                await addNewIdea({title, description}).unwrap()
            }
            if (edit && ideaId !== undefined) {
                await editIdea({ id: ideaId, title, description}).unwrap();
            }
            setTitle("");
            setDescription("")
            console.log("Form is Submitted")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const cancelHandler = () => {
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
                <div className="inp-grp lg">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={e => { setTitle(e.target.value) }} placeholder="Enter your Idea's title here" />
                </div>
                <div className="inp-grp lg">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="Description of your idea" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
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
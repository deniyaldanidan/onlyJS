import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import '../styles/my-form.scss';
import validator from "validator";
import { isString } from "lodash";
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
    const { isAuth, access_token } = useAppSelector(state => state.auth.data);
    const [addNewIdea] = useAddNewIdeaMutation();
    const [editIdea] = useEditIdeaMutation();

    useEffect(() => {
        if (!isAuth || !isString(access_token) || !validator.isJWT(access_token)) {
            navigate("/")
        }
    }, [isAuth, access_token, navigate])

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
                await addNewIdea({title, description, acc_tkn: access_token as string}).unwrap()
            }
            if (edit && ideaId !== undefined) {
                await editIdea({ id: ideaId, title, description, acc_tkn: access_token as string}).unwrap();
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
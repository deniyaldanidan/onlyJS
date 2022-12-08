import { FormEventHandler, useEffect, useRef, useState } from 'react'
import { FiSquare, FiCheckSquare } from 'react-icons/fi'
import { RiCloseCircleLine } from 'react-icons/ri';
import useOnClickOutside from '../..//hooks/useOnClickOutside';
import { Due, Tags, myTags, dues, Tag } from '../../types/Tasks';
import { IoMdCheckmark } from 'react-icons/io'
import useTasks from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

type TaskFormProps = {
    taskId?: string,
    edit?: boolean,
    initialName?: string,
    initialImp?: boolean,
    initialDue?: Due,
    initialNote?: string,
    initialTags?: Tags,
}

const TaskForm = ({ taskId = "", edit = false, initialName, initialImp, initialDue, initialNote, initialTags }: TaskFormProps): JSX.Element => {

    const { editTask, addTask } = useTasks()
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [important, setImportant] = useState<boolean>(false);
    const [due, setDue] = useState<Due>("");
    const [note, setNote] = useState<string>("");
    const [tags, setTags] = useState<Tags>([]);

    const [dueFocus, setDueFocus] = useState<boolean>(false);
    const [tagsFocus, setTagsFocus] = useState<boolean>(false);

    const dueRef = useRef<HTMLDivElement>(null)
    const tagsRef = useRef<HTMLDivElement>(null);

    const [err, setErr] = useState<string>("")

    useEffect(() => {
        if (edit) {
            initialName?.length && setName(initialName);
            typeof initialImp === "boolean" && setImportant(initialImp);
            initialDue?.length && setDue(initialDue);
            initialNote?.length && setNote(initialNote);
            initialTags?.length && setTags(initialTags)
        }
    }, [edit, initialName, initialImp, initialDue, initialNote, initialTags])


    const toggImp = () => {
        setImportant(prev => !prev)
    }

    useOnClickOutside(dueRef, () => {
        setDueFocus(false)
    })

    useOnClickOutside(tagsRef, () => {
        setTagsFocus(false);
    })

    const multiDrpHndlr = (tag: Tag) => {
        if (tags.includes(tag)) {
            setTags(prev => prev.filter(t => t !== tag))
            return;
        }
        setTags(prev => [...prev, tag])
    }

    const tagsValueDel = (tag: Tag) => {
        setTags(prev => prev.filter(t => t !== tag))
    }

    const dueFocusTogg = () => {
        setDueFocus(prev => !prev)
    }

    const cancelHandler = () => {
        navigate("/")
        console.log("cancel btn is clicked");
    }

    useEffect(() => {
        setErr("")
    }, [name, important, note, tags, due])

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setErr("")
        if (!name) {
            setErr("Field are empty")
            return;
        }

        try {
            if (edit) {
                if (taskId?.length) {
                    const status = await editTask(taskId, { name, important, due, note, tags })
                    console.log(status);
                }
            } else if (!edit) {
                const status = await addTask({ name, important, due, note, tags });
                console.log(status);
            }
        } catch (error) {
            const err = error as Error;
            console.log(error);
            return setErr(err.message)
        }
        navigate("/");
        console.log("Submitted")
    }

    return (
        <div className="my-form">
            <div className="form-head">{edit ? "Edit" : "Add"} Task</div>
            <div className="err">{err}</div>
            <form onSubmit={submitHandler}>
                <div className="inp-grp">
                    <label htmlFor="name">Task Name</label>
                    <input type="text" id="name" placeholder="Task Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="inp-chk">
                    <div className="chk-label" onClick={toggImp}>Important</div>
                    <div className="chk-value" onClick={toggImp}>
                        {
                            important ? <FiCheckSquare className='icon' /> : <FiSquare className='icon empty' />
                        }
                    </div>
                </div>
                <div className="inp-drp-single-grp">
                    <label>Due</label>
                    <div className="inp-drp-single" ref={dueRef}>
                        <div className="inp-drp-value" onClick={() => { dueFocusTogg() }}>{due.length ? due : <span>Due Date</span>}</div>
                        {dueFocus ? (
                            <div className="inp-drp-opts">
                                {dues.map(d => d.length ? <div key={d} onClick={() => { setDue(d); setDueFocus(false); }}>{d} {due === d ? <IoMdCheckmark /> : ""}</div> : null)}
                            </div>
                        ) : ""}
                    </div>
                </div>
                <div className="inp-grp">
                    <label htmlFor="note">Note</label>
                    <input type="text" id="note" placeholder="Type Note Here" value={note} onChange={e => { setNote(e.target.value) }} />
                </div>
                <div className="inp-drp-multi-grp">
                    <label>Tags</label>
                    <div className="inp-drp-multi" ref={tagsRef}>
                        <div className="inp-drp-value" onClick={() => setTagsFocus(true)}>
                            {tags.map(t => <div key={t}><span>{t}</span><RiCloseCircleLine onClick={() => tagsValueDel(t)} /></div>)}
                        </div>
                        {
                            tagsFocus ?
                                (
                                    <div className="inp-drp-opts">
                                        {
                                            myTags.map(tag => <div key={tag} onClick={() => multiDrpHndlr(tag)}>{tag} {tags.includes(tag) ? <IoMdCheckmark /> : ""}</div>)
                                        }
                                    </div>
                                ) : ""
                        }
                    </div>
                </div>

                <div className="btn-grps">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;
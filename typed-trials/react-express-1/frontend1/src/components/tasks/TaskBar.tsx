// import {} from 'react'
import { Task } from "../../types/Tasks";
import { SlOptions } from 'react-icons/sl';
import { AiFillStar, AiOutlineStar, AiFillEdit, AiFillDelete, AiOutlineFileText, AiOutlineTags, AiOutlineClockCircle } from 'react-icons/ai'
import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useTasks from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

type TaskBarProps = {
    task: Task
}

const TaskBar = ({ task }: TaskBarProps) => {
    const {toggTaskImp, deleteTask} = useTasks();
    const navigate = useNavigate();

    const noteRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [noteActive, setNoteActive] = useState<boolean>(false);
    const [optMenuActive, setOptMenuActive] = useState<boolean>(false);

    const optionsClickHandler = ()=>{
        setOptMenuActive(prev=>!prev)
    }

    useOnClickOutside(noteRef, ()=>{
        setNoteActive(false)
    });

    useOnClickOutside(menuRef, ()=>{
        setOptMenuActive(false)
    })

    const noteClickHandler = ()=>{
        setNoteActive(prev=>!prev)
    }

    const impClickHandler = ()=>{
        toggTaskImp(task.id)
    }

    const editBtnHandler = ()=>{
        navigate("/edit", {state: {task_id: task.id}, replace:true})
    }

    const deleteBtnHandler = ()=>{
        deleteTask(task.id);
    }


    return (
        <div className={task.important ? "task-bar highlight" : "task-bar"}>
            <div className="top-sec">
                <div className="name-sec">{task.name}</div>
                <div className="top-side-sec">
                    <div className="imp-sec" onClick={impClickHandler}>
                        {task.important ? <AiFillStar className="icon" /> : <AiOutlineStar className="icon" />}
                    </div>
                    <div className="options-sec" ref={menuRef}>
                        <div className="options-icon" onClick={optionsClickHandler}><SlOptions /></div>
                        {optMenuActive ? (
                            <div className="opt-menus">
                                <div className="opt-menu" onClick={editBtnHandler} ><AiFillEdit/> <span>Edit</span></div>
                                <div className="opt-menu" onClick={deleteBtnHandler} ><AiFillDelete/> <span>Delete</span></div>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>
            <div className="lower-sec">
                {task?.due ? <div className="due-sec"><AiOutlineClockCircle /> <span>{task.due}</span></div> : ""}
                {task?.note?.length ? (
                    <div className="note-sec" ref={noteRef}>
                        <div
                            className="note-icon"
                            onClick={noteClickHandler}
                        >
                            <AiOutlineFileText />
                        </div>
                        {noteActive ? <div className="note-drp-dwn">{task.note}</div> : ""}
                    </div>
                ) : ""}
                {
                    task?.tags?.length ? <div className="tags-sec"><AiOutlineTags /> <span>{task.tags.join(", ")}</span></div> : ""
                }
            </div>
        </div>
    )
}

export default TaskBar;
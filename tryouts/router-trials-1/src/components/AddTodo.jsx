import React from 'react'
import { useState } from 'react'
import { addTodo } from '../data';
import InpGrp from './InpGrp';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [nameError, setNameError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  const submitHandler = ()=>{
    if(!name.length) return setNameError("Please, Mention your task name");
    if(!deadline.length) return setDeadlineError("Please, Mention your task deadline");

    addTodo({name, deadline});
    setName("");
    setDeadline("");
    setNameError("");
    setDeadlineError("");
    navigate("/todo");
  }


  return (
    <div className='add-todo'>
        <div className="add-todo-head">Add Task</div>
        <InpGrp 
          label="Task name" 
          placeholder="Name of the task" 
          inpState={name}
          chgHandler={e=>{setNameError("") ; setName(e.target.value)}}
          errorState={nameError}
        />
        <InpGrp 
          label="Deadline"
          placeholder="Deadline of the task"
          inpState={deadline}
          chgHandler={e=>{setDeadlineError("") ; setDeadline(e.target.value)}}
          errorState={deadlineError}
        />
        <button onClick={submitHandler} >Submit</button>
    </div>
  )
}

export default AddTodo
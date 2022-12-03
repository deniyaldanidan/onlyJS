import React, { useContext, useState } from 'react';
import { myTasks } from '../data';
import { ProviderType } from '../types/common';
import { addTask, ContextTasks, deleteTask, editTask, findTask, Task, Tasks, toggTaskImp } from '../types/Tasks';


const TaskContext:React.Context<ContextTasks> = React.createContext({} as ContextTasks);

const idGen:()=>string = ()=>`task_${Math.round(Math.random()*100000000)}`

export const TaskContextProvider:ProviderType = ({children})=>{
    const [tasks, setTasks] = useState<Tasks>(myTasks as Tasks);

    const findTask:findTask = (id)=>{
        return tasks.find(tk=>tk.id===id)
    }

    const addTask:addTask = data=>{

        const newTask:Task = {id:idGen(), ...data} 
        setTasks(prev=>[...prev, newTask])
        return "Task is added";
    }

    const editTask:editTask = (id, data)=>{
        setTasks(prev=>prev.map(tk=>tk.id===id ? {id, ...data} : tk))
        return "Task is edited";
    }

    const deleteTask:deleteTask = (id)=>{
        setTasks(prev=>prev.filter(tk=>tk.id!==id))
        return "Task is deleted"
    }

    const toggTaskImp:toggTaskImp = (id)=>{
        setTasks(prev=>prev.map(tk=>tk.id===id ? {...tk, important: !tk.important} : tk))
    }


    return <TaskContext.Provider value={{tasks, setTasks, findTask, addTask, editTask, deleteTask, toggTaskImp}}>{children}</TaskContext.Provider>
}

export default function useTasks ():ContextTasks{
    return useContext(TaskContext)
}
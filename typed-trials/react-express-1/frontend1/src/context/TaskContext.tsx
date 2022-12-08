import { AxiosResponse, isAxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import taskApi from '../api/taskApi';
import { ProviderType } from '../types/common';
import { addTask, ContextTasks, deleteTask, editTask, fetchAllTasks, findTask, Task, Tasks, toggTaskImp } from '../types/Tasks';

const TaskContext: React.Context<ContextTasks> = React.createContext({} as ContextTasks);

// const idGen: () => string = () => `task_${Math.round(Math.random() * 100000000)}`

export const TaskContextProvider: ProviderType = ({ children }) => {
    const [tasks, setTasks] = useState<Tasks>([] as Tasks);

    const fetchAll: fetchAllTasks = async (controller) => {
        try {
            const result: AxiosResponse = await taskApi.get("/", {
                signal: controller?.signal
            });
            const data: Tasks = result.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    useEffect(() => {
        console.log("Context reloaded")
        let isMounted = true;
        const controller = new AbortController();
        const getAllTasks = async () => {
            try {
                const data: Tasks = await fetchAll(controller);
                isMounted && setTasks(data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllTasks()

        return () => {
            controller.abort();
            isMounted = false;
        }
    }, [])

    const findTask: findTask = async (id, controller) => {
        try {
            const result = await taskApi.get(`/${id}`, {
                signal: controller?.signal
            });
            return result.data?.name && result.data
        } catch (error) {
            throw error
        }
    }

    const addTask: addTask = async data => {
        try {
            const result = await taskApi.post("/", data);
            console.log(result.data);
            (result.data?.success && result.data?.task?.name) && setTasks(prev => [...prev, result.data.task])
            return "Task is added";
        } catch (error) {
            if (isAxiosError(error)) {
                if (error?.response?.data?.error) {
                    throw Error(error?.response?.data?.error)
                }
            }
            throw error
        }
    }

    const editTask: editTask = async (id, data) => {
        try {
            const result  = await taskApi.put("/", {id, ...data});
            console.log(result);
            const updTask:Task = result.data.task;
            setTasks(prev => prev.map(tk => tk.id === updTask.id ? updTask : tk))
            return "Task is edited";
        } catch (error) {
            if (isAxiosError(error)) {
                if (error?.response?.data?.error) {
                    throw Error(error?.response?.data?.error)
                }
            }
            throw error
        }
    }

    const deleteTask: deleteTask = async (id) => {
        try {
            const result = await taskApi.delete("/", {
                data: {id}
            })
            console.log(result.data);
            setTasks(prev => prev.filter(tk => tk.id !== id))
            console.log(`Task ${id} is deleted`)
            return ;
        } catch (error) {
            console.log(error)
        }
    }

    const toggTaskImp: toggTaskImp = async (id) => {
        try {
            const result  = await taskApi.put("/toggImp", {id});
            console.log(result.data);
            const toggdTask:Task = result.data.task;
            setTasks(prev=>prev.map(tk=>tk.id === toggdTask.id ? toggdTask : tk))
            return ;
        } catch (error) {
            console.log(error)
        }
        setTasks(prev => prev.map(tk => tk.id === id ? { ...tk, important: !tk.important } : tk))
    }


    return <TaskContext.Provider value={{ tasks, setTasks, findTask, addTask, editTask, deleteTask, toggTaskImp }}>{children}</TaskContext.Provider>
}

export default function useTasks(): ContextTasks {
    return useContext(TaskContext)
}
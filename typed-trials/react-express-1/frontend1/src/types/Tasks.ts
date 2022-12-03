import { Dispatch, SetStateAction } from "react"

export const myTags = ["Hobby", "Work", "Chores", "RelationShip", "Family", "School", "Entertainment"] as const;
export const dues = ["Today", "Yesterday", "Tomorrow", "This Week", "This Weekend", "Next Week", "This Month", ""] as const;

export type Tag = (typeof myTags)[number]

export type Tags = Array<Tag>;

export type Due = (typeof dues)[number];

export type TaskData = {
    name: string,
    important: boolean,
    due?: Due,
    note?: string,
    tags?: Tags
}

export type Task = TaskData & {
    id: string,
}

export type Tasks = Array<Task>;

export type ContextTasks = {
    tasks: Tasks,
    setTasks: Dispatch<SetStateAction<Tasks>>,
    findTask: findTask,
    addTask: addTask,
    editTask: editTask,
    deleteTask: deleteTask,
    toggTaskImp: toggTaskImp
}

export type findTask = (id: string) => Task | undefined;

export type addTask = (data: TaskData) => string

export type editTask = (id:string, data:TaskData)=>string

export type deleteTask = (id:string)=>string

export type toggTaskImp = (id:string)=>void
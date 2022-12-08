import { useEffect, useState } from 'react'
import useTasks from '../context/TaskContext';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskForm from '../components/tasks/TaskForm';
import { Task } from '../types/Tasks';

const initialData: Task = {
    id: "",
    name: "",
    important: false,
    due: "",
    note: "",
    tags: []
}

const Edit = (): JSX.Element => {
    const { findTask } = useTasks()
    const navigate = useNavigate();
    const location = useLocation();
    const [tasKData, setTaskData] = useState<Task>(initialData)

    useEffect(() => {
        if (!location.state?.task_id) {
            navigate("/");
            return;
        }
        let _id: string = location.state.task_id;
        const controller = new AbortController();
        
        const getTask: () => Promise<void> = async () => {
            try {
                const myTask = await findTask(_id, controller);
                if (!myTask) {
                    navigate("/");
                    return;
                }
                setTaskData(myTask)
            } catch (error) {
                const err = error as Error;
                console.log(error);
                if (err.message==="canceled" || err.name === "CanceledError"){
                    return;
                } 
                navigate("/")
            }
        }

        getTask();

        return ()=>{
            controller.abort()
        }
    }, [location, navigate, findTask])

    return <TaskForm taskId={tasKData.id} edit={true} initialName={tasKData.name} initialImp={tasKData.important} initialDue={tasKData.due} initialNote={tasKData.note} initialTags={tasKData.tags} />

}

export default Edit
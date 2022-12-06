import { useEffect, useState } from 'react'
import useTasks from '../context/TaskContext';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskForm from '../components/tasks/TaskForm';
import { Task } from '../types/Tasks';

const initialData:Task = {
    id: "",
    name: "",
    important: false,
    due : "",
    note: "",
    tags: []
}

const Edit = (): JSX.Element => {
    const {findTask} = useTasks()
    const navigate = useNavigate();
    const location = useLocation();
    const [tasKData, setTaskData] = useState<Task>(initialData)

    useEffect(()=>{
        if (!location.state?.task_id){
            navigate("/");
            return;
        }
        let _id:string = location.state.task_id;
        const myTask = findTask(_id);
        if(!myTask){
            navigate("/");
            return;
        }
        setTaskData(prev=>({...prev, ...myTask}))

    }, [location, navigate, findTask])

    return <TaskForm taskId={tasKData.id} edit={true} initialName={tasKData.name} initialImp={tasKData.important} initialDue={tasKData.due} initialNote={tasKData.note} initialTags={tasKData.tags} />

}

export default Edit
import TaskBar from "../components/tasks/TaskBar";
import useTasks from "../context/TaskContext";

const Home = ():JSX.Element => {
  const { tasks } = useTasks();

  return (
    <div className="my-tasks">
      {tasks.map(tsk => <TaskBar key={tsk.id} task={tsk} />)}
    </div>
  )
}

export default Home
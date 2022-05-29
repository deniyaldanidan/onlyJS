import Task from "./Task"

const Tasks = ({ tasks, onDelete, toggleReminder }) => {

  return (
    <>
        {
            tasks.map(task=><Task key={task._id} task={task} onDelete={onDelete} onToggle={toggleReminder} />)
        }
    </>
  )
}

export default Tasks
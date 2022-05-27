import Header from './components/Header'
import Tasks from './components/Tasks';
import {useState} from 'react'
import AddTask from './components/AddTask';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true
    },
    {
        id: 2,
        text: 'Dinner with Friends',
        day: 'Feb 5th at 8:10pm',
        reminder: true
    },
    {
        id: 3,
        text: 'Morning Yoga',
        day: 'Feb 6th at 6:00am',
        reminder: false
    }
  ]);

  // Delete Task
  const deleteTask = (id)=>{
    let filteredTasks = tasks.filter(task=>task.id!==id);
    setTasks(filteredTasks)
  }

  // Toggle reminder
  const toggleReminder = (id)=>{
    let chgdTasks = tasks.map(task => task.id===id ? {...task, reminder:!task.reminder} : task);
    setTasks(chgdTasks);
  }

  // Add Task
  const addTask = (task)=>{
    task.id = Math.floor((Math.random()*10000) + 1000);
    setTasks([...tasks, task]);
  }

  // showHideForm
  const showHideForm = ()=>{
    setShowForm(!showForm);
  }


  return (
    <div className="container">
      <Header title='My Tasks' toggleForm={showHideForm} formState={showForm} />
      {showForm && <AddTask addTask={addTask}/>}
      { tasks.length ? <Tasks tasks={tasks} toggleReminder={toggleReminder} onDelete={deleteTask}/> : 'No Tasks to show'}
    </div>
  );
}

export default App;

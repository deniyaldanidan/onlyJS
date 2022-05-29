import Header from './components/Header'
import Tasks from './components/Tasks';
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const getTasks = async()=>{
      const myTasks = await fetchTasks();
      setTasks(myTasks);
    }
    getTasks();
  }, []);

  const fetchTasks = async ()=>{
    try {
      const res = await fetch('http://192.168.169.6:8081/tasks');
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Delete Task
  const deleteTask = async (id)=>{
    try {
      const res = await fetch("http://localhost:8081/tasks",  {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
      });
      const data = await res.json();
      if(data.success){
        let filteredTasks = tasks.filter(task=>task._id!==id);
        setTasks(filteredTasks)
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Toggle reminder
  const toggleReminder = async (id)=>{
    try {
      const res = await fetch("http://localhost:8081/tasks/reminder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
      });
      const updTask = await res.json();
      setTasks(tasks.map(task => task._id===id ? updTask : task));

    } catch (error) {
      console.log(error);
    }
  }

  // Add Task
  const addTask = async (task)=>{
    try {
      const res = await fetch("http://localhost:8081/tasks", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.log(error);
    }
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

import React from 'react'
import todoData from '../data'
import TodoCard from './TodoCard'
import { Outlet, useSearchParams } from 'react-router-dom'

const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = e=>{
    let filter = e.target.value;
    if(filter){
      return setSearchParams({filter});
    }
    setSearchParams({});
  }

  return (
    <>
    <Outlet />
    <input type="text" className="search-bar" value={searchParams.get("filter") || ""} onChange={handleChange} placeholder="Search Here" />
    <div className="mytodos">
        {
            todoData.filter(todo=>{
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = todo.name.toLowerCase();
              return name.includes(filter.toLowerCase());
            }).map(todo=><TodoCard key={todo.id} todo={todo} showcase={false} />)
        }
    </div>
    </>
  )
}

export default Todos
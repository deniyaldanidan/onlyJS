import React from 'react'
import todoData from '../data'
import TodoCard from './TodoCard'
import { Outlet } from 'react-router-dom'

const Todos = () => {
  return (
    <>
    <Outlet />
    <div className="mytodos">
        {
            todoData.map(todo=><TodoCard key={todo.id} todo={todo} showcase={false} />)
        }
    </div>
    </>
  )
}

export default Todos
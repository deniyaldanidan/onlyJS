import React from 'react'
import { NavLink } from 'react-router-dom'

const TodoCard = ({todo}) => {
  return (
    <NavLink className={({isActive})=> (isActive ? "chosen" : "" ) + " todo-card"} to={`/todo/${todo.id}`}>
        <img src={`https://picsum.photos/seed/${todo.id}/300/300`} alt="" />
        <div className="todo-name">{todo.name}</div>
    </NavLink>
  )
}

export default TodoCard
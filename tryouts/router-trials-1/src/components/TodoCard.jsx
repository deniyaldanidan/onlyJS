import React from 'react'
import QueryNavLink from './QueryNavLink'


const TodoCard = ({todo, clickHandler}) => {
  return (
    <QueryNavLink className={({isActive})=> (isActive ? "chosen" : "" ) + " todo-card"} to={`/todo/${todo.id}`} onClick={clickHandler} >
        <img src={`https://picsum.photos/seed/${todo.id}/350/300`} alt="" />
        <div className="todo-name">{todo.name}</div>
    </QueryNavLink>
  )
}


export default TodoCard
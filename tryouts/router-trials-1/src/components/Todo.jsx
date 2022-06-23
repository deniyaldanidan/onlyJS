import React from 'react'
import {useParams} from 'react-router-dom';
import {getTodo} from '../data'

const Todo = () => {
    let params = useParams();
    let mytodo = getTodo(params.todoId);
    return (
        <div className='todo-showcase'>
            {mytodo ? (<><img src={`https://picsum.photos/seed/${mytodo.id}/900/500`} alt="" />
            <div className="todo-show-text">{mytodo.name}</div>
            <div className="todo-show-text">{mytodo.deadline}</div></>) : (
                <h1 className='page-banner'>No Such Todos Found</h1>
            )}
            
        </div>
    )
}

export default Todo
import React from 'react';
import todoData from '../data';
import TodoCard from './TodoCard';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { MdAddTask } from 'react-icons/md'
import { useRef } from 'react';

const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const outletRef = useRef();
  
  const handleChange = debounce(filter=>{
    if(filter.length) return setSearchParams({filter});
    return setSearchParams({});
  }, 500);

  const scrollHandler = ()=>outletRef.current.scrollIntoView({block:"end", behavior: "smooth"});

  return (
    <>
    <input type="text" className="search-bar"  onChange={e=>handleChange(e.target.value)} placeholder="Search Here" />
    <div className="mytodos">
        {
          todoData.filter(todo=>{
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = todo.name.toLowerCase();
            return name.includes(filter.toLowerCase());
          }).map(todo=><TodoCard key={todo.id} todo={todo} showcase={false} clickHandler={scrollHandler} />)
        }
        <Link className="add-todo-card" to="/todo/add" onClick={scrollHandler} > <MdAddTask /></Link>
    </div>
    <div id="my-outlet" ref={outletRef}>
      <Outlet />
    </div>
    </>
  )
}

export default Todos
import React, { useEffect, useState, useCallback } from 'react'
import peopleApi from '../../api/peopleApi';
import MyPeople from './MyPeople';

const initial_page = 1;

const Infinite1 = () => {

    const [state, setState] = useState([]);
    const [page, setPage] = useState(initial_page);
    const [pageLimit, setPageLimit] = useState(false);
    
    const scrollHandler = useCallback(function(){
        let myPos = window.innerHeight + document.documentElement.scrollTop;
        if(myPos === document.documentElement.offsetHeight) return !pageLimit && setPage(prev=>prev+1);
    }, [pageLimit]);

    useEffect(()=>{
        if(!pageLimit){
            peopleApi.get(`/paginate/${page}`).then(res=>{
                if (res.data.length) { 
                    if (page===1) return setState([...res.data]);
                    if (res.data.length < 5) setPageLimit(true);
                    return setState(prev=>[...prev, ...res.data]); 
                }
                return setPageLimit(true);
            }).catch(error=>console.log(error));
        }
            
        return ()=>{
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [page, scrollHandler, pageLimit])


    window.addEventListener("scroll", scrollHandler)

    return (
        <div className='infinite1'>{
            state.length && state.map(mystate=><MyPeople key={mystate._id} people={mystate} />)    
        }</div>
    )
}

export default Infinite1
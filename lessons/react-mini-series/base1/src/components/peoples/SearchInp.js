import React, { useMemo, useState, useRef, useEffect } from 'react'
import usePeopleContext from '../../contexts/peopleContext';
import MyPeople from './MyPeople';
import { debounce } from 'lodash';

const SearchInp = () => {
    const [filter, setFilter] = useState("");
    const [mypeeps, setMyPeeps] = useState([]);
    const {fetchPeoples} = usePeopleContext();
    const inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus()
    }, [])

    useEffect(()=>{
        if(!filter.length){
            setMyPeeps([]);
        } else{
            fetchPeoples(filter).then(data=>{
                setMyPeeps(data);        
            })
        }
    }, [filter, fetchPeoples])

    const handleReset = ()=>{
        if (!filter.length) return;
        setFilter("");
    }

    const handleFil = debounce((value)=>{
        setFilter(value)
    }, 1000)

    const renderLists = useMemo(()=>{
        if(!filter.length || !mypeeps.length){
            return <div className='empty-msg'>Results will be displayed in here"</div>
        }
        return mypeeps.map(peep=><MyPeople key={peep._id} people={peep} />)
    }, [filter, mypeeps]);

    return (
        <div className='search-body'>
            <div className='search-section'>
                <input placeholder='Search for People in our list' onChange={e=>handleFil(e.target.value)} ref={inputRef} />
                <button className='reset-btn' onClick={handleReset} >Reset</button>
            </div>
            <div className="search-content">
                {renderLists}
            </div>
        </div>
    );
}

export default SearchInp
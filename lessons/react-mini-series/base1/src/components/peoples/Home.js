import React from 'react'
import usePeopleContext from '../../contexts/peopleContext';
import MyPeople from './MyPeople';

const Home = () => {

    const {peoples} = usePeopleContext();
    const renderPeoples = ()=>{
        return peoples.map(people=><MyPeople key={people._id} people={people} />)
    }
    // console.log(peoples);

    return (
        <div className='home'>
            <div className="home-header">All</div>
            {
            peoples?.length ? renderPeoples() : "Empty"
            }
        </div>
    )
}

export default Home
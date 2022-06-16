import React from 'react'
import '../styles/peoples.css';
import {Routes, Route} from 'react-router-dom';
import Header from '../components/peoples/Header';
import { PeopleContextProvider } from '../contexts/peopleContext';
import Home from '../components/peoples/Home';
import SearchInp from '../components/peoples/SearchInp';
import Infinite1 from '../components/peoples/Infinite1';

const Peoples = () => {
    return (
        <PeopleContextProvider>
            <div className='people-app'>
                <Header />
                <Routes>
                    <Route path='/people' element={
                        <Home />
                    } />
                    <Route path='/addPeople' element={
                        <div>Add People</div>
                    } />
                    <Route path='/searchpeople' element={
                        <SearchInp />
                    } />
                    <Route path='/infinite1' element={
                        <Infinite1 />
                    } />
                </Routes>
            </div>
        </PeopleContextProvider>
    )
}

export default Peoples
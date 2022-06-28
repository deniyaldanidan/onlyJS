import React, {useEffect, useState} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate, useLocation} from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const myAxiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async ()=>{
            try {
                const response = await myAxiosPrivate.get("/employees", {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (error) {
                if (isMounted){
                    console.log(error);
                    navigate("/login", {state: {from: location}, replace: true});
                }
            }
        }

        getUsers();
        return ()=>{
            isMounted = false;
            controller.abort();
        }
    }, [myAxiosPrivate, location, navigate])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, index)=><li key={index}>{`${user?.firstname} ${user?.lastname}`}</li>)}
                </ul>
            ): <p>No Users to display</p>}
        </article>
    )
}

export default Users
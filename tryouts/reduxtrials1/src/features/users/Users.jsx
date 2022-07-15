import React from 'react'
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom';
import UserEl from './UserEl';
import { selectUsers } from './userSlice'

const Users = () => {

    const users = useSelector(selectUsers);

    const renderUsers = users.map((user,index)=>(
        <Link to={`/user/${user.id}`} key={index}>
            <UserEl user={user} />
        </Link>
    ))

  
    return (
        <>
            <div className='my-users-list'>
                {renderUsers}
            </div>
        </>
    )
}

export default Users
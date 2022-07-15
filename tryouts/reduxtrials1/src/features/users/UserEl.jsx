import React from 'react'

const UserEl = ({user}) => {
  return (
    <div className='user-el'>
        <img src={`https://i.pravatar.cc/200?u=${user.id}`} alt={user.name} />
        <div className='user-name'>{user.name}</div>
    </div>
  )
}

export default UserEl
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/userSlice'
import {parseISO, formatDistanceToNow } from 'date-fns';

const Notification = ({notif}) => {

    const userName = useSelector(state=>selectUserById(state, notif?.user))?.name || "Unknown User";
    const parsedDate = parseISO(notif.date);
    const timeAgo = formatDistanceToNow(parsedDate);
  
    return (
        <div>
            <div>{notif.name}</div>
            <div><span>{timeAgo}</span> for <span>{userName}</span> </div>
        </div>
    )
}

export default Notification
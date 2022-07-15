import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllNotifcations } from './notificationsSlice';
import NotificationEl from './NotificationEl';

const Notifications = () => {

    const notifs = useSelector(selectAllNotifcations);

    const renderNotifs = notifs.length && notifs.map((notif,index)=><NotificationEl key={index} notif={notif} />)
  
    return (
        <div>
            <div>Notifications</div>
            <div>{renderNotifs}</div>
        </div>
    )
}

export default Notifications
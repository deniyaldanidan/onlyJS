import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({timeStamp}) => {

    let timeAgo = "";
    if(timeStamp){
        let date = parseISO(timeStamp);
        let timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }


    return (
        <span>{timeAgo}</span>
    )
}

export default TimeAgo
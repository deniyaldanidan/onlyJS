import React from 'react'

const MyPeople = ({people}) => {
    return (
        <div className="my-people">
            <div className="left">
                <img src={`https://i.pravatar.cc/100?u=${people._id}`} alt="profile" title={people.name} />
            </div>
            <div className="right">
                <div className="top"><span>{people.name}</span>, <span>{people.age}</span></div>
                <div className="bottom">{people.profession}</div>
            </div>
        </div>
    )
}

export default MyPeople
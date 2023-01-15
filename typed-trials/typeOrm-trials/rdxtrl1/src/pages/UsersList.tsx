import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../features/allUsers/allUsersSlice";
import { fetchAllUsersType } from "../features/api/apiSliceHelper";


const UsersList = (): JSX.Element => {

    const users: Array<fetchAllUsersType> = useSelector(selectAllUsers)

    return (
        <>
            <div className="info-bar" style={{ marginBottom: "20px" }}>All Users</div>
            <div className="users-list">
                {
                    users.map(user => (
                        <div className="user-card" key={user.username}>
                            <div className="name">{user.profile.firstname + " " + user.profile.lastname}</div>
                            <div className="username">@{user.username}</div>
                            <div className="card-links">
                                <Link to="/" className="card-link">View all ideas</Link>
                                <Link to={`/view-profile/${user.username}`} className="card-link">View profile</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default UsersList;
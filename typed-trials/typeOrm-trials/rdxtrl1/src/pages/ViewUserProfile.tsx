import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { selectUserByUsername } from "../features/allUsers/allUsersSlice";
import {SlLocationPin} from 'react-icons/sl';

const ViewUserProfile = (): JSX.Element => {
    const { username } = useParams();

    const selectedUser = useSelector(state => selectUserByUsername(state, username || ""));

    return (
        selectedUser !== undefined ? (
            <div className="user-card" key={selectedUser.username}>
                <div className="name">{selectedUser.fullname}</div>
                <div className="username">@{selectedUser.username}</div>
                <div className="joined">Joined {formatDistanceToNow(new Date(selectedUser.joined_date), {addSuffix: true})}</div>
                <div className="location"><SlLocationPin/> {selectedUser.profile.location || "location not provided"}</div>
                <div className="bio">{selectedUser.profile.bio || "bio not provided"}</div>
                <div className="card-links">
                    <Link to="/" className="card-link">View Ideas</Link>
                </div>
            </div>
        ) : <div className="info-bar danger">User not found</div>
    )
}

export default ViewUserProfile;
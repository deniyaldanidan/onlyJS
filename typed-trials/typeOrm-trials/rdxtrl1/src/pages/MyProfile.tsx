import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";
import SimpleIdeaLister from "../Components/SimpleIdeaLister";
import { useGetMyProfileQuery } from "../features/myProfile/myProfileSlice";
import '../styles/my-profile.scss';



const MyProfile = (): JSX.Element => {
    const { data, isSuccess, isError, error } = useGetMyProfileQuery();

    useEffect(() => {
        // isSuccess && console.log(data);
        isError && console.log(error)
    }, [isSuccess, data, isError, error])

    if (isError) {
        return <div className="info-bar danger">Error Happened</div>
    }

    if (isSuccess) {

        const likedIdeas = data.likes.filter((like: any) => like.like_value === "like").map((like: any) => like.idea);

        const unlikedIdeas = data.likes.filter((like: any) => like.like_value === "unlike").map((like: any) => like.idea);

        const profileData = {
            firstname: data.profile.firstname,
            lastname: data.profile.lastname,
            bio: data.profile.bio,
            location: data.profile.location
        }

        return (
            <>
                <Link className="edit-my-profile" to="/edit-my-profile" state={{profile: profileData}} >Edit profile</Link>
                <div className="user-card">
                    <div className="name">{data.profile.firstname + " " + data.profile.lastname}</div>
                    <div className="username">@{data.username}</div>
                    <div className="joined">Joined {formatDistanceToNow(new Date(data.joined_date), { addSuffix: true })}</div>
                    <div className="location"><SlLocationPin />{data.profile.location || "location not found"}</div>
                    <div className="bio">{data.profile.bio || "bio not found"}</div>
                </div>

                <SimpleIdeaLister mytitle="My Ideas" ideas={data.ideas} />
                <SimpleIdeaLister mytitle="Liked Ideas" ideas={likedIdeas} />
                <SimpleIdeaLister mytitle="Unliked Ideas" ideas={unlikedIdeas} />

                <div className="my-ideas">
                    <div className="head">My Comments</div>
                    <div className="contents">
                        {
                            data.comments.map((comment: any) => (
                                <div className="comment-idea-box" key={comment.id}>
                                    <Link to={`/idea/${comment.idea.id}`} className="commented-on">Idea: {comment.idea.title}</Link>
                                    <div className="comment">Comment: {comment.comment}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        )
    }

    return <div className="info-bar">loading</div>;
}

export default MyProfile;
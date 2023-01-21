import { FormEventHandler, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateProfileMutation } from "../features/myProfile/myProfileSlice";


const EditProfile = () => {
    const [firstname, setFirtname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [updateProfile] = useUpdateProfileMutation();
    const mylocation = useLocation()
    const navigate = useNavigate();

    useEffect(()=>{
        if (mylocation.state?.profile){
            const profileDat = mylocation.state.profile;
            setFirtname(profileDat.firstname);
            setLastname(profileDat.lastname);
            setLocation(profileDat.location);
            setBio(profileDat.bio)
        } else{
            navigate("/")
        }
    }, [mylocation, navigate])

    const submitHandler: FormEventHandler = async e => {
        e.preventDefault();
        if (!firstname.length || !lastname.length || !location.length || !bio.length) {
            return;
        }
        try {
            await updateProfile({firstname, lastname, location, bio}).unwrap();
            navigate("/my-profile");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="edit-profile-form">
            <div className="head">Edit Profile</div>
            <form onSubmit={submitHandler}>
                <div className="inp-grp lg">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" value={firstname} onChange={e => setFirtname(e.target.value)} />
                </div>
                <div className="inp-grp lg">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" value={lastname} onChange={e => setLastname(e.target.value)} />
                </div>
                <div className="inp-grp lg">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="inp-grp lg">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)}></textarea>
                </div>

                <div className="btn-grps">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;
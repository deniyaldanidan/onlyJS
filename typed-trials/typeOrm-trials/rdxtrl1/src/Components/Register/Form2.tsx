import { Dispatch, ReactEventHandler, SetStateAction } from "react"
import { registerInitialLoad } from "../../features/auth/authUtilities"
import { validOutType } from "../../hooks/useValidateInput"



type Form2PropsType = {
    submitHandler: ReactEventHandler,
    backHandler: () => void,
    fnameOpts: validOutType<registerInitialLoad['fname']>,
    lnameOpts: validOutType<registerInitialLoad['lname']>,
    locationOpts: validOutType<registerInitialLoad['location']>,
    bioOpts: [registerInitialLoad['bio'], Dispatch<SetStateAction<registerInitialLoad['bio']>>]
}

const Form2 = ({ submitHandler, backHandler, fnameOpts, lnameOpts, locationOpts, bioOpts }: Form2PropsType): JSX.Element => {
    const [fname, setFname, fnameErr] = fnameOpts;
    const [lname, setLname, lnameErr] = lnameOpts;
    const [location, setLocation, locationErr] = locationOpts;
    const [bio, setBio] = bioOpts;

    return (
        <form onSubmit={submitHandler}>
            <div className="dual-grouped-input">
                <div className="inp-grp sm">
                    <label htmlFor="fname">First Name*</label>
                    <div className="error-inp">
                        <input type="text" id="fname" value={fname} onChange={e => setFname(e.target.value)} />
                        <div className="inp-err">{fnameErr}</div>
                    </div>
                </div>
                <div className="inp-grp sm">
                    <label htmlFor="lname">Last Name*</label>
                    <div className="error-inp">
                        <input type="text" id="lname" value={lname} onChange={e => setLname(e.target.value)} />
                        <div className="inp-err">{lnameErr}</div>
                    </div>
                </div>
            </div>
            <div className="inp-grp">
                <label htmlFor="location">Where you're from?</label>
                <div className="error-inp">
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
                    <div className="inp-err">{locationErr}</div>
                </div>
            </div>
            <div className="inp-grp lg">
                <label htmlFor="bio">Say something about you?</label>
                <textarea id="bio" onChange={e => setBio(e.target.value)}  value={bio}></textarea>
            </div>
            <div className="btns-grp">
                <button onClick={backHandler} type="button">back</button>
                <button type="submit">SignUp</button>
            </div>
        </form>
    )
}

export default Form2;
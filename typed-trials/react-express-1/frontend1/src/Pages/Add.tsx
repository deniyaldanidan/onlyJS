import { useState } from 'react'
import {FiSquare, FiCheckSquare} from 'react-icons/fi'
import {RiCloseCircleLine} from 'react-icons/ri';
import { Due, Tags, myTags, dues, Tag } from '../types/Tasks';

const Add = (): JSX.Element => {

    const [name, setName] = useState<string>("");
    const [important,  setImportant] = useState<boolean>(false);
    const [due, setDue] = useState<Due>("");
    const [note, setNote] = useState<string>("");
    const [tags, setTags] = useState<Tags>(["Hobby", "Chores"]);


    const toggImp = ()=>{
        setImportant(prev=>!prev)
    }

    const multiDrpHndlr = (tag:Tag)=>{

    }

    return (
        <div className="my-form">
            <div className="form-head">Add Task</div>
            <div className="err">Error Happened</div>
            <form>
                <div className="inp-grp">
                    <label htmlFor="name">Task Name</label>
                    <input type="text" id="name" placeholder="Task Name" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div className="inp-chk">
                    <div className="chk-label" onClick={toggImp}>Important</div>
                    <div className="chk-value" onClick={toggImp}>
                        {
                            important ? <FiCheckSquare className='icon'/> : <FiSquare className='icon empty'/>
                        }
                    </div>
                </div>
                <div className="inp-drp-single-grp">
                    <label>Due</label>
                    <div className="inp-drp-single">
                        <div className="inp-drp-value">{due}</div>
                        <div className="inp-drp-opts">
                            {dues.map(d=><div key={d} onClick={()=>{setDue(d)}}>{d}</div>)}
                        </div>
                    </div>
                </div>
                <div className="inp-grp">
                    <label htmlFor="note">Note</label>
                    <input type="text" id="note" placeholder="Type Note Here" />
                </div>
                <div className="inp-drp-multi-grp">
                    <label>Tags</label>
                    <div className="inp-drp-multi">
                        <div className="inp-drp-value">
                            {tags.map(t=><div key={t}><span>{t}</span><RiCloseCircleLine/></div>)}
                        </div>
                        <div className="inp-drp-opts">
                            {
                                myTags.map(tag=><div key={tag} onClick={()=>multiDrpHndlr(tag)}>{tag}</div>)
                            }
                        </div>
                    </div>
                </div>

                <div className="btn-grps">
                    <button type="submit">Add</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Add
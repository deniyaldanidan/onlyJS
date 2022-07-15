import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { addNewPost } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUsers } from '../users/userSlice';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [userId, setUserId] = useState(0);
  const [err, setErr] = useState("");
  const [ reqStatus, setReqStatus ] = useState("idle");
  const users = useSelector(selectUsers);
  const titleRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    titleRef.current.focus()
  }, [])

  useEffect(()=>{
    setErr("");
  }, [title, excerpt, userId])

  const handleSubmit = async e=>{
    e.preventDefault();
    //! Handling errors
    if(!title || !excerpt) return setErr("Please Fill out all the fields");
    if(!Number.isInteger(parseInt(userId))) return setErr("Invalid Entry");
    //* If valid
    // dispatch(add(title, excerpt, parseInt(userId)));
    if (reqStatus!=="idle") return;
    try {
      setReqStatus("pending");
      await dispatch(addNewPost({title, excerpt, user: parseInt(userId)})).unwrap();
      setTitle(""); setExcerpt(""); setUserId(0);
    } catch (error) {
      console.log(error);
      setErr(error.message);
    } finally{
      setReqStatus("idle")
      navigate("/")
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-head">Add Post</div>
      <div className="err-msg">{err}</div>
      <div className="inp-grp">
        <label htmlFor="post-title">Title</label>
        <input type="text" id='post-title' ref={titleRef} value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="inp-grp">
        <label htmlFor="post-excerpt">Excerpt</label>
        <input type="text" id='post-excerpt' value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
      </div>
      <div className="inp-grp">
        <label htmlFor="post-author">Author</label>
        <select id="post-author" value={userId} onChange={e=>setUserId(e.target.value)}>
          {
            users.map((user, index)=><option key={index} value={user.id} >{user.name}</option>)
          }
        </select>
      </div>
      <div className="btn-grp">
        <button disabled={reqStatus!=="idle"}>{reqStatus==="idle" ? "submit" : "submitting.."}</button>
        <button type='button'>Cancel</button>
      </div>
    </form>
  )
}

export default AddPost
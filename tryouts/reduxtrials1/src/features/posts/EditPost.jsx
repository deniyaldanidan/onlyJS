import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { update, selectPostById } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [err, setErr] = useState("");
  const titleRef = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = parseInt(params.id);
  const post = useSelector(state=>selectPostById(state, postId));
  const navigate = useNavigate();
  
  useEffect(()=>{
    titleRef.current.focus()
    setTitle(post?.title || "");
    setExcerpt(post?.excerpt || "");
  }, [post])

  useEffect(()=>{
    setErr("");
  }, [title, excerpt])

  const handleSubmit = e=>{
    e.preventDefault();
    if(!title || !excerpt) return setErr("Please Fill out all the fields");
    dispatch(update({id: postId, title, excerpt}));
    setTitle("");
    setExcerpt("");
    navigate(-1);
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-head">Edit Post</div>
      <div className="err-msg">{err}</div>
      <div className="inp-grp">
        <label htmlFor="post-title">Title</label>
        <input type="text" id='post-title' ref={titleRef} value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="inp-grp">
        <label htmlFor="post-excerpt">Excerpt</label>
        <input type="text" id='post-excerpt' value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
      </div>
      <div className="btn-grp">
        <button>Submit</button>
        <button type='button'>Cancel</button>
      </div>
    </form>
  )
}

export default EditPost
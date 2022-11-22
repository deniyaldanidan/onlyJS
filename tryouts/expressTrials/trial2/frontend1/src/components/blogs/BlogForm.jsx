import React, { useEffect, useRef, useState } from 'react';
import {MdClose, MdCheck} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({initialTitle="", initialExcerpt="", initialBody="", edit=false, successLink, cancelLink, requestFunc}) => {
    const titleRef = useRef();
    const navigate = useNavigate();

    const [title, setTitle] = useState(initialTitle);
    const [validTitle, setValidTitle] = useState(false);
    const [titleErr, setTitleErr] = useState("");
    const [titleFocus, setTitleFocus] = useState(false);

    const [excerpt, setExcerpt] = useState(initialExcerpt);
    const [validExcerpt, setValidExcerpt] = useState(false);
    const [excerptErr, setExcerptErr] = useState("");
    const [excerptFocus, setExcerptFocus] = useState(false);

    const [body, setBody] = useState(initialBody);
    const [validBody, setValidBody] = useState(false);
    const [bodyErr, setBodyErr] = useState("");
    const [bodyFocus, setBodyFocus] = useState(false)

    const [author, setAuthor] = useState("");
    const [authorErr, setAuthorErr] = useState("");

    const [err, setErr] = useState("");

    useEffect(()=>{
        titleRef.current.focus()
    }, []);

    useEffect(()=>{
        setValidTitle(title.length>=5);
    }, [title]);

    useEffect(()=>{
        setValidExcerpt(excerpt.length>=5);
    }, [excerpt]);

    useEffect(()=>{
        setValidBody(body.length>=30);
    }, [body])

    const handleSubmit = async (e)=>{
        e.preventDefault()

        setErr("");
        setTitleErr("");
        setExcerptErr("");
        setBodyErr("");
        setAuthorErr("");

        if (!edit){
            if (!validTitle || !validBody || !validExcerpt || !author) return setErr("Fill out all fields");
        }
        if (edit){
            if (!validTitle || !validBody || !validExcerpt) return setErr("Fill out all fields");
        }

        try {
            const result  = await requestFunc({title, excerpt, author, body})
            console.log(result);
            setTitle("");
            setBody("");
            setExcerpt("");
            setAuthor("");
            return navigate(successLink);
        } catch (error) {
            const errStatus = error?.response?.status;
            if (errStatus===404 || errStatus===400) return setErr(error?.response?.data.error)
            if (errStatus===409){
                const errorsObj = error?.response?.data?.errors;
                errorsObj?.title && setTitleErr(errorsObj?.title);
                errorsObj?.excerpt && setExcerptErr(errorsObj?.excerpt);
                errorsObj?.author && setAuthorErr(errorsObj?.author);
                errorsObj?.body && setBodyErr(errorsObj?.body);
                return console.log(errorsObj);
            }
            return console.log(error);
        }
    }

    const cancelHandler = ()=>{
        setTitle("");
        setBody("");
        setExcerpt("");
        setAuthor("");
        navigate(cancelLink);
    }

    return (
        <div className="my-form">
            <h1>{!edit ? "Create" : "Edit" } Blog</h1>
            <div className="main-error">{err}</div>
            <form onSubmit={handleSubmit}>
                <div className="input-sec">
                    <label htmlFor="title">Title {titleFocus ? (validTitle ? <MdCheck className='icon' /> : <MdClose className='icon invalid' /> ) : ""}</label>
                    <input ref={titleRef} required type="text" id='title' value={title} onChange={e=>setTitle(e.target.value)} onFocus={()=>setTitleFocus(true)} onBlur={()=>setTitleFocus(false)} />
                    <div className="input-error">{titleErr}</div>
                </div>
                <div className="input-sec">
                    <label htmlFor="excerpt">Excerpt {excerptFocus ? (validExcerpt ? <MdCheck className='icon' /> : <MdClose className='icon invalid' /> ) : ""}</label>
                    <input type="text" id='excerpt' required value={excerpt} onChange={e=>setExcerpt(e.target.value)} onFocus={()=>setExcerptFocus(true)} onBlur={()=>setExcerptFocus(false)} />
                    <div className="input-error">{excerptErr}</div>
                </div>
                { !edit ? (
                <div className="input-sec">
                    <label htmlFor="author">Author</label>
                    <input required type="text" id='author' value={author} onChange={e=>setAuthor(e.target.value)} />
                    <div className="input-error">{authorErr}</div>
                </div> ) : "" }
                <div className="input-sec">
                    <label htmlFor="body">Body {bodyFocus ? (validBody ? <MdCheck className='icon' /> : <MdClose className='icon invalid' /> ) : ""}</label>
                    <textarea id="text" 
                        value={body} 
                        required
                        onChange={e=>setBody(e.target.value)} 
                        onFocus={()=>setBodyFocus(true)} 
                        onBlur={()=>setBodyFocus(false)} 
                    ></textarea>
                    <div className="input-error">{bodyErr}</div>
                </div>
                <button type='submit'>Submit</button>
                <button type='button' onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default BlogForm;
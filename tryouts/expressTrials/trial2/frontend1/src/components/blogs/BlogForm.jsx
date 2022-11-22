import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputSec from '../InputSec';

const BlogForm = ({ initialTitle = "", initialExcerpt = "", initialBody = "", edit = false, successLink, cancelLink, requestFunc }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(initialTitle);
    const [validTitle, setValidTitle] = useState(false);
    const [titleErr, setTitleErr] = useState("");

    const [excerpt, setExcerpt] = useState(initialExcerpt);
    const [validExcerpt, setValidExcerpt] = useState(false);
    const [excerptErr, setExcerptErr] = useState("");

    const [body, setBody] = useState(initialBody);
    const [validBody, setValidBody] = useState(false);
    const [bodyErr, setBodyErr] = useState("");

    const [author, setAuthor] = useState("");
    const [authorErr, setAuthorErr] = useState("");

    const [err, setErr] = useState("");

    useEffect(() => {
        setValidTitle(title.length >= 5);
    }, [title]);

    useEffect(() => {
        setValidExcerpt(excerpt.length >= 5);
    }, [excerpt]);

    useEffect(() => {
        setValidBody(body.length >= 30);
    }, [body])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErr("");
        setTitleErr("");
        setExcerptErr("");
        setBodyErr("");
        setAuthorErr("");

        if (!edit) {
            if (!validTitle || !validBody || !validExcerpt || !author) return setErr("Fill out all fields");
        }
        if (edit) {
            if (!validTitle || !validBody || !validExcerpt) return setErr("Fill out all fields");
        }

        try {
            const result = await requestFunc({ title, excerpt, author, body })
            console.log(result);
            setTitle("");
            setBody("");
            setExcerpt("");
            setAuthor("");
            return navigate(successLink);
        } catch (error) {
            const errStatus = error?.response?.status;
            if (errStatus === 404 || errStatus === 400) return setErr(error?.response?.data.error)
            if (errStatus === 409) {
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

    const cancelHandler = () => {
        setTitle("");
        setBody("");
        setExcerpt("");
        setAuthor("");
        navigate(cancelLink);
    }

    return (
        <div className="my-form">
            <h1>{!edit ? "Create" : "Edit"} Blog</h1>
            <div className="main-error">{err}</div>
            <form onSubmit={handleSubmit}>
                <InputSec
                    inputId="title"
                    value={title}
                    setValue={setTitle}
                    valid={validTitle}
                    focusOnStart={true}
                    err={titleErr}
                    label="Title"
                    placeholder="Title of the blog"
                    hasInfo={false}
                />
                <InputSec
                    inputId="excerpt"
                    value={excerpt}
                    setValue={setExcerpt}
                    valid={validExcerpt}
                    err={excerptErr}
                    label="Excerpt"
                    placeholder="Excerpt of the blog"
                    hasInfo={false}
                />
                {!edit ? (
                    <InputSec
                        inputId="author"
                        value={author}
                        setValue={setAuthor}
                        err={authorErr}
                        label="Author"
                        placeholder="Name of the author"
                        hasInfo={false}
                        hasValidIcon={false}
                    />
                ) : ""}
                <InputSec
                    inputId="body"
                    value={body}
                    setValue={setBody}
                    valid={validBody}
                    err={bodyErr}
                    textArea={true}
                    label="Body"
                    placeholder="Write Content of the blog here"
                    hasInfo={false}
                />
                <button type='submit'>Submit</button>
                <button type='button' onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default BlogForm;
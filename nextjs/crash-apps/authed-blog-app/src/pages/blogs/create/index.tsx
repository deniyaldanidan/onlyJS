import InputGrp from "@/components/InputGrp";
import Layout1 from "@/components/Layout1";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { parseStringify } from "@/lib/utilsFns";
import { ObjectId } from "mongoose";
import Head from "next/head";
import { FormEventHandler, useState } from "react";
import styles from '../../../styles/blog_form.module.scss';
import MySelect from "@/components/MySelect";
import InputStyled from "@/components/styled/InputStyled";
import useSWRMutation from 'swr/mutation';
import { addCatBtn, addCatCntStyles, addCatErr, addCatHead, addCatInp, addCatInpGrp } from "./styles";
import { sendReq } from "@/lib/fetchers";
import { useRouter } from 'next/router';
import { useDarkLight } from "@/context/darkLight";
import clsx from "clsx";
// import {setCookie} from 'cookies-next';


type catObj = {
    value: ObjectId,
    name: string
}

type props = {
    initialCatgs: catObj[]
}

export default function CreateBlog({ initialCatgs }: props) {

    const router = useRouter();
    const { isDark } = useDarkLight();

    const [title, setTitle] = useState<string>("");
    const [excerpt, setExcerpt] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [myCatgs, setMyCatgs] = useState<typeof initialCatgs>(initialCatgs);
    const [categories, setCategories] = useState<Array<ObjectId>>([]);
    const [err, setErr] = useState<string>("");

    const [addCatErrState, setAddCatErrState] = useState<string>("");
    const [addCatInpState, setAddCatInpState] = useState<string>("");

    const { trigger: addNewCat, isMutating: isAddingCat, reset: catReset } = useSWRMutation("/api/categories/create", sendReq);

    const { trigger: postBlog, isMutating: isPostingBlog, reset: resetBlogPosting } = useSWRMutation("/api/blogs/create", sendReq);

    const submitHandler: FormEventHandler = e => {
        e.preventDefault();
        if (isPostingBlog) {
            return;
        }
        setErr("");

        if (!title.length || !excerpt.length || !body.length || !author.length || !categories.length || categories.length > 4) {
            console.log("Error Happened")
            return setErr("Invalid values");
        }
        postBlog({ data: { title, excerpt, body, author, categories } }).then(response => {
            if (response?.error) {
                console.log(response);
                setErr(response.error)
                return;
            }
            if (response?._id && response?.title && response?.createdAt) {
                console.log(response);
                router.push("/")
                return;
            }
        }).finally(() => {
            resetBlogPosting()
        })

    }

    const handleCatAdd = () => {
        if (isAddingCat) {
            return;
        }
        setAddCatErrState("")
        if (!addCatInpState.length) {
            return setAddCatErrState("Category length should be between 1 and 4")
        }

        addNewCat({ data: { name: addCatInpState } }).then(response => {
            if (response?.error) {
                return setAddCatErrState(response.error)
            }
            if (response?._id && response?.name) {
                const newCat: catObj = { value: response._id, name: response.name }
                setMyCatgs(prev => [...prev, newCat]);
                categories.length < 4 && setCategories(prev => [...prev, response?._id]);
                setAddCatInpState("");
            }
        }).finally(() => {
            catReset();
        })

    }

    const cancelHandler = () => {
        console.log("Cancel button is clicked")
        // setCookie('dummy', "dummy value", {maxAge: 60})
        router.push("/");
    }

    return (
        <>
            <Head>
                <title>Create Blog</title>
            </Head>
            <Layout1>
                <div className={styles.blog_form}>
                    <div
                        className={clsx(styles.blog_head, isDark && styles.dark)}>
                        Create New Blog
                    </div>
                    <div className={clsx(styles.blog_form_error, isDark && styles.dark)}>{err}</div>
                    <form onSubmit={submitHandler}>
                        <InputGrp<typeof title> label="title" state={title} stateAction={setTitle} placeHolderText="Title of your blog" />
                        <InputGrp<typeof excerpt> label="excerpt" state={excerpt} stateAction={setExcerpt} placeHolderText="Excerpt of your blog" />
                        <InputGrp<typeof author> label="author" state={author} stateAction={setAuthor} placeHolderText="Name of the author" />

                        <MySelect<ObjectId>
                            options={myCatgs}
                            selected={categories}
                            stateAction={setCategories}
                            executeCondition={categories.length < 4}
                            optionsHead="Choose a category:"
                        >
                            <>
                                <div style={addCatHead}>Add New Category:</div>
                                <div style={addCatCntStyles}>
                                    <div style={addCatInpGrp}>
                                        <InputStyled
                                            style={addCatInp}
                                            value={addCatInpState}
                                            onChange={e => setAddCatInpState(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.code === "Enter") {
                                                    e.preventDefault();
                                                    handleCatAdd()
                                                }
                                            }
                                            }
                                            dark={false}
                                        />
                                        <div style={addCatErr}>{addCatErrState}</div>
                                    </div>
                                    <button style={addCatBtn} disabled={isAddingCat} type="button" onClick={handleCatAdd} >Add</button>
                                </div>
                            </>
                        </MySelect>

                        <InputGrp<typeof body> label="body" state={body} stateAction={setBody} textarea placeHolderText="Content of the blog" />

                        <div className={styles.btn_grps}>
                            <button type="submit" disabled={isPostingBlog}>Submit</button>
                            <button type="button" onClick={cancelHandler} disabled={isPostingBlog}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Layout1>
        </>
    )
}

export async function getServerSideProps() {
    await dbConnect();
    const myCatgs = await Category.find({}).select("name _id").lean().exec();

    return {
        props: {
            initialCatgs: parseStringify(myCatgs.map(cat => ({ value: cat._id, name: cat.name })))
        }
    }
}
import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { formatDistanceToNow } from 'date-fns';
import utilStyles from '../../styles/utils.module.css';


export default function Post({ postData }) {
    return <Layout>
        <Head><title>{postData.title}</title></Head>
        <article>
            <h1 className={utilStyles.headingX1}>
                {postData.title}
            </h1>
            <div className={utilStyles.lightText}>
                {formatDistanceToNow(new Date(postData.date), { addSuffix: true })}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}
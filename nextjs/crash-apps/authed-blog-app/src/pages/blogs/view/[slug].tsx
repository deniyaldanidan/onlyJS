import { GetServerSidePropsContext } from 'next';
import dbConnect from '@/lib/dbConnect';
import Blog, { BlogWId_T } from '@/models/Blog';
import { parseStringify } from '@/lib/utilsFns';

type props = {
    blog: BlogWId_T | null
}

export default function BlogView({ blog }: props) {

    return (
        <div className='info-page'>
            Blog View Page
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    await dbConnect();
    const blog = await Blog.findOne({ slug: context.query.slug || "" });
    if (!blog) {
        return {
            redirect: {
                permanent: false,
                destination: "/blogs/view/notfound"
            },
            props: {}
        }
    }
    return {
        props: {
            blog: parseStringify(blog)
        }
    }
}
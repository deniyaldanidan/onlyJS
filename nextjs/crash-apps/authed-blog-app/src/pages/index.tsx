import dbConnect from '@/lib/dbConnect';
import Blog, { BlogWId_T } from '@/models/Blog';
import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import { GetStaticProps } from 'next';
import { parseStringify } from '@/lib/utilsFns';
import Subscribe from '@/components/subscribe';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import { useEffect } from 'react';

type myProps = {
  blogs: BlogWId_T[]
}

export default function Home(props: myProps) {
  const {data:session, status:sessionStatus} = useSession();

  useEffect(()=>{
    if (sessionStatus === "authenticated"){
      console.log(session)
    }
    console.log(session)
  }, [sessionStatus, session])

  return (
    <>
      <Head>
        <title>Blogata-Home</title>
        <meta name="description" content="Blogata - A new age blogging app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.hero}>
        <div>
          <div className={styles.intro_head}>Welcome to Blogata</div>
          <div className={styles.intro_sub}>
            Blogata is the fairyland for bloggers. We have a wide variety of blogs to quench your thirst for information. Have fun.
          </div>
        </div>
        <Subscribe bright="mild" />
      </section>
      <Link href="/blogs/create" className='mslt'>Create blog</Link>
      {session ? `You're signed in as ${session.user?.name || session.user?.email}` : "Not Signed"}
      <Link href="/admin" className='mslt'>Admin Page is here</Link>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  await dbConnect();

  const blogs = await Blog.find({}, '-__v').populate({
    path: "categories",
    select: ["name", "slug"]
  });


  return {
    props: {
      blogs: parseStringify(blogs)
    },
    revalidate: 60 * 60 * 12 // re-build the page every 12 hours in Production-mode
  }
}
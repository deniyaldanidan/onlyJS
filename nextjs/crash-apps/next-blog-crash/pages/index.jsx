import Head from 'next/head';
import Layout from '../components/layout';
import { siteTitle } from '../lib/variables';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Hey I'm Glenn Watson. I'm a Technology ethusiast and an experienced software developer.</p>
        <p>This is a sample website which I'm currently building...</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {formatDistanceToNow(new Date(date), { addSuffix: true })}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
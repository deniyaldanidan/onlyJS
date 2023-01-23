import Head from "next/head";
import Link from "next/link";


export default function About (){
    return (
        <>
            <Head>
                <title>About Page</title>
            </Head>
            <h1>This is a about page</h1>
            <h2><Link href="/">Back to Home</Link></h2>
        </>
    )
}
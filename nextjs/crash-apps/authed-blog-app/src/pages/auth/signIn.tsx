import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth/next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import styles from '@/styles/signIn.module.scss';


export default function SignIn({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    // console.log(providers);

    return (
        <div className={styles.signInContainer}>
            <div className={styles.contHead}>Sign Up Using</div>
            <div className={styles.oauth}>
                <FcGoogle className={styles.oauthSym} onClick={()=>signIn('google')} />
                <span>Or</span>
                <FaGithub className={styles.oauthSym} onClick={()=>signIn('github')} />
            </div>
            <div className={styles.orSym}>Or</div>
            <div>
                <form method="post" action="/api/auth/signin/email">
                    <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
                    <div className={styles.inpGrp}>
                        <label htmlFor="email"> Using Email</label>
                        <input type="email" name="email" id="email" placeholder="example@example.com" />
                    </div>
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const csrfToken = await getCsrfToken(context);

    if (session || !csrfToken) {
        return { redirect: { destination: context.query?.callbackUrl || "/" } };
    }

    const providers = await getProviders();

    return {
        props: {
            providers: providers ?? [],
            csrfToken
        }
    }
}
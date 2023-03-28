import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
import styles from '@/styles/signIn.module.scss';


export default function SignIn({providers}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    console.log(providers);

    return (
        <div>
            <div className={styles.oauth}><span>Sign Up using:</span> <FcGoogle /> <span>OR</span> <FaGithub /> </div>
        </div>
    )
}


export async function getServerSideProps(context:GetServerSidePropsContext){
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session){
        return { redirect: { destination: context.query?.callbackUrl || "/" } };
    }

    const providers = await getProviders();

    return {
        props: {
            providers: providers ?? []
        }
    }
}
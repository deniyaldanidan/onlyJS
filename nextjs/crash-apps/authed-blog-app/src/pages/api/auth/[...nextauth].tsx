import dbConnect from "@/lib/dbConnect";
import { MongooseAdapter } from "@/lib/mongooseAdapter";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from "next-auth/providers/email";
import mailTransportOpts from '@/lib/mailTransportOpts';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        EmailProvider({ server: mailTransportOpts, from: mailTransportOpts.from as string })
    ],
    session: {
        strategy: "database",
        maxAge: 3 * 24 * 60 * 60
    },
    adapter: MongooseAdapter(dbConnect),
    callbacks: {
        async session({ session, user }) {
            (session?.user as any).roles = (user as any)?.roles;
            (session?.user as any).id = (user as any)?.id;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/signIn"
    }
};

export default NextAuth(authOptions)
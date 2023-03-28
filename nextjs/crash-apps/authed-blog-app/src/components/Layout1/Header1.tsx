import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './header1.module.scss';



const DynamicToggler = dynamic(() => import('../ThemeToggler'), {
    ssr: false
});

export default function Header1({ dark }: { dark: boolean }) {

    const { data: sessionData, status: sessionStatus } = useSession();

    return (
        <div className={clsx(styles.header, dark && styles.dark)}>
            <div className={styles.logo}>Blogata</div>
            <div className={styles.head_menus}>
                <Link href="/" className={styles.menu}>Home</Link>
                <Link href="/blogs" className={styles.menu}>Blogs</Link>
                <div className={styles.menu}>About</div>
                {
                    sessionStatus === "authenticated" ? (
                        <>
                            <div className={styles.menu}>Hi, {sessionData.user?.name || "User"}</div>
                            <div className={styles.menu} onClick={() => signOut()}>SignOut</div>
                        </>
                    ) : <div className={styles.menu} onClick={() => signIn()}>SignIn</div>
                }
                <DynamicToggler />
            </div>
        </div>
    )
}
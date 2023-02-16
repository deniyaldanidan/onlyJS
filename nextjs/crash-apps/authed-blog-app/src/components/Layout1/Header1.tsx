import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './header1.module.scss';


const DynamicToggler = dynamic(() => import('../ThemeToggler'), {
    ssr: false
});

export default function Header1({dark}:{dark:boolean}) {

    return (
        <div className={clsx(styles.header, dark && styles.dark)}>
            <div className={styles.logo}>Blogata</div>
            <div className={styles.head_menus}>
                <Link href="/" className={styles.menu}>Home</Link>
                <Link href="/blogs" className={styles.menu}>Blogs</Link>
                <div className={styles.menu}>About</div>
                <div className={styles.menu}>login</div>
                <div className={styles.menu}>register</div>
                <DynamicToggler />
            </div>
        </div>
    )
}
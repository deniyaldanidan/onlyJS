import styles from './footer.module.scss';
import Link from 'next/link';
import { ImFacebook } from 'react-icons/im';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import Subscribe from '../subscribe';
import clsx from 'clsx';

export default function Footer({dark}:{dark:boolean}): JSX.Element {
    return (
        <div className={clsx(styles.footer, dark && styles.dark)}>
            <Subscribe />
            <div className={styles.pri_section}>
                <div className={styles.social_links}>
                    <ImFacebook />
                    <AiFillInstagram />
                    <AiOutlineTwitter style={{}} />
                    <FaTiktok style={{}} />
                </div>
                <div className={styles.footer_menu}>
                    <Link href="/" >Home</Link>
                    <Link href="/about" >About</Link>
                    <Link href="/blogs"  >Blogs</Link>
                    <Link href="/contact" >Contact</Link>
                </div>
                <div className={styles.footer_menu}>
                    <Link href="/privacy-policy" >privacy policy</Link>
                    <Link href="/cookie-policy" >cookie policy</Link>
                    <Link href="/terms-n-conditions" >terms and conditions</Link>
                </div>
            </div>
            <div className={styles.sec_section}>
                &copy; 2023 All rights reservered.
            </div>
        </div>
    )
}
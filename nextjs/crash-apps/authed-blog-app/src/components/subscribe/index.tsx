import styles from './subscribe.module.scss';
import clsx from 'clsx';

type props = {
    bright?: false | "mild" | "ultra"
}

export default function Subscribe({ bright = false }: props) {
    return (
        <div className={styles.subscribe}>
            <div
                className={clsx(styles.head, bright==="ultra" && styles.bright, bright==="mild" && styles.mild, )}>
                Subscribe to our newsletter
            </div>
            <div className={styles.subscribe_col}>
                <input
                    type="email"
                    className={clsx(bright==="ultra" && styles.bright, bright==="mild" && styles.mild)}
                    placeholder='enter your email here'
                />
                <button
                    type='button'
                >
                    Subscribe
                </button>
            </div>
        </div>
    )
}
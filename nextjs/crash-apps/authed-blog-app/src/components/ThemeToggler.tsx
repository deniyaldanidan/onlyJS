import { useDarkLight } from '@/context/darkLight';
import clsx from 'clsx';
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';

export default function ThemeToggler() {
    const {currMode, toggCurrMode} = useDarkLight();

    return (
        <div className={clsx('dark-light-togg', currMode === "Dark" && "dark")} onClick={toggCurrMode}>
            <div className={clsx('togg-btn', currMode === "Dark" && "dark")}>
                {
                    currMode === "Dark" ? (
                        <BsFillMoonFill />
                    ) : (
                        <BsFillSunFill />
                    )
                }
            </div>
        </div>
    )
}
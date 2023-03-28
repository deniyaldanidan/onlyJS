import styles from './index.module.scss';
import clsx from 'clsx';
import { Dispatch, SetStateAction,  useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import useClickOutside from '@/hooks/useClickOutside';
import { useDarkLight } from '@/context/darkLight';

type props<T> = {
    selected: T[],
    stateAction: Dispatch<SetStateAction<T[]>>,
    options: { value: T, name: string }[],
    children?: JSX.Element,
    executeCondition: boolean,
    optionsHead: string,
    label:string
}

export default function MySelect<T>({ selected, stateAction, options, children, executeCondition, optionsHead, label }: props<T>) {
    const [drpState, setDrpState] = useState<boolean>(false);
    const myDiv = useRef<HTMLDivElement | null>(null);
    const {isDark} = useDarkLight();
    
    useClickOutside(() => {
        setDrpState(false)
    }, myDiv.current)


    const optClickHandler = (value: T) => {
        if (selected.find(val => val === value)) {
            stateAction(prev => prev.filter(val => val !== value));
        } else {
            if (!executeCondition) {
                console.log("Category limit exceeded");
                return;
            } else{
                stateAction(prev => [...prev, value]);
            }
        }
    }

    const catRmvr = (value: T) => {
        setTimeout(() => {
            stateAction(prev => prev.filter(val => val !== value));
        }, 50);
    }

    return (
        <div className={styles.selectGrp}>
            <div className={clsx(styles.label, isDark && styles.dark)}>{label}</div>
            <div className={styles.selectCntr} ref={myDiv} >
                <div className={clsx(styles.selectDisplayCntr, isDark && styles.dark)} >
                    <span className={styles.selected}>
                        {
                            selected.length ? selected.map(val => (
                                <div
                                    className={styles.selected_value}
                                    key={val as string}
                                >
                                    <span className={styles.text}>
                                        {options.find(opt => opt.value === val)?.name}
                                    </span>
                                    <span className={styles.btn} onClick={() => catRmvr(val)}><AiFillCloseCircle /></span>
                                </div>
                            )) : <span className={styles.empty}>Choose categories for your blog</span>
                        }
                    </span>

                    <span className={clsx(styles.drpBtn, drpState && styles.drpBtnActive)} onClick={() => setDrpState(prev => !prev)} ></span>
                </div>

                <div className={clsx(styles.drpCnt, !drpState && styles.hidden)} >
                    {children}
                    <div className={styles.optionsHd}>{optionsHead}</div>
                    {
                        options.map(({ value, name }) => <div className={styles.option} key={value as string} onClick={() => optClickHandler(value)} >{name}</div>)
                    }
                </div>
            </div>
        </div>
    )

}
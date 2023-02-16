import React from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import styles from './layout.module.scss';
import clsx from "clsx";
import { useDarkLight } from "@/context/darkLight";

type LayProps = {
    children: React.ReactNode,
    padTop?: boolean,
    padTopLow?:boolean
}

export default function Layout1({children, padTop=false, padTopLow=false}: LayProps): JSX.Element {
    const {isDark} = useDarkLight();

    return (
        <main>
            <Header1 dark={isDark} />
            <main className={clsx(styles.section, padTop && styles.noTop, padTopLow && styles.lowTop, isDark && styles.dark)}>
                {children}
            </main>
            <Footer dark={isDark} />
        </main>
    )
}
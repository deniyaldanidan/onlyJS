import React from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import clsx from "clsx";
import { useDarkLight } from "@/context/darkLight";

type LayProps = {
    children: React.ReactNode
}

export default function Layout1({children}: LayProps): JSX.Element {
    const {isDark} = useDarkLight();

    return (
        <main>
            <Header1 dark={isDark} />
            <main style={{
                minHeight: "700px",
                padding: "45px",
                backgroundColor: isDark ? "#474554" : "#fff"
            }}>
                {children}
            </main>
            <Footer dark={isDark} />
        </main>
    )
}
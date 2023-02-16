import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useContext, useEffect, useState } from 'react';

type modeType = "Light" | "Dark";

type darklightProps = {
    currMode: modeType,
    toggCurrMode: () => void,
    isDark: boolean
}

const DarkLightContext = createContext<darklightProps>({
    currMode: "Light",
    toggCurrMode: () => { },
    isDark: false
});

export default function DarkLightProvider({ children }: { children: JSX.Element }) {
    const [currMode, setCurrMode] = useState<modeType>("Light")
    const key: string = "Theme";

    useEffect(() => {
        const storedTheme = localStorage.getItem(key);
        if (storedTheme !== null && (storedTheme === "Light" || storedTheme === "Dark")) {
            setCurrMode(storedTheme);
        }
    }, [key])

    const toggCurrMode = () => {
        setCurrMode(prev => {
            if (prev==="Dark"){
                localStorage.setItem(key, "Light");
                return "Light";
            }
            localStorage.setItem(key, "Dark");
            return "Dark";
        })
    }

    return (
        <DarkLightContext.Provider value={{ currMode: currMode as modeType, toggCurrMode, isDark: currMode==="Dark" }}>{children}</DarkLightContext.Provider>
    )
}

export function useDarkLight() {
    return useContext(DarkLightContext);
}
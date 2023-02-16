import { useEffect } from "react";


export default function useClickOutside(cb:()=>void, myEl:HTMLElement | null){

    useEffect(() => {
        let listenerCallback = (e: MouseEvent) => {
            if (!myEl?.contains(e.target as Node)) {
                cb()
            }
        }
        document.addEventListener("click", listenerCallback);
        return () => {
            document.removeEventListener("click", listenerCallback);
        }
    }, [cb, myEl])

}
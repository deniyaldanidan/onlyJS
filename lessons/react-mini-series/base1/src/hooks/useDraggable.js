import { useEffect, useRef } from 'react';

const useDraggable = (zIndex=0)=>{
    const myRef = useRef();

    useEffect(()=>{
        const dragStartHandler = (e)=>{
            let img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
            e.dataTransfer.setDragImage(img, 0,0);
            // Setting position=absolute
            myRef.current.style.position='absolute';
            myRef.current.style.zIndex = zIndex;
            // ondrag
            myRef.current.addEventListener("drag", dragHandler);
            // dragover
            myRef.current.addEventListener("dragover", dragOverHandler)
            // ondragEnd
            myRef.current.addEventListener('dragend', dragEndHandler);
        };

        const dragHandler = (e)=>{
            if(e.clientX===0 && e.clientY===0){
                return;
            }
            const box = e.target.getBoundingClientRect()
            myRef.current.style.top = `${e.clientY - (box.height/2)}px`;
            myRef.current.style.left = `${e.clientX - (box.width/2)}px`;
        }

        const dragEndHandler = ()=>{
            myRef.current.removeEventListener("drag", dragHandler);
            myRef.current.removeEventListener("dragover", dragOverHandler);
            myRef.current.removeEventListener("dragend", dragEndHandler);
        }

        const dragOverHandler = e=>{
            e.preventDefault();
        };

        // ondragstart
        myRef.current.addEventListener("dragstart", dragStartHandler);
        return;
    }, [zIndex])

    return myRef;
}

export default useDraggable;
import React, {useState, useRef} from 'react';
import { FloatingLink } from '../../components/CustLinks';
import {AnimatePresence, Reorder} from 'framer-motion';
import './reorderStyles.scss';
import Item from './Item';

const initialData = [
        {id: 1, data: "🍅 Tomato", complete:false}, 
        {id: 2, data:"🥒 Cucumber", complete:false}, 
        {id: 3, data:"🧀 Cheese", complete:false}, 
        {id: 4, data:"🥬 Lettuce", complete:false}
];

const Reorder1 = ()=>{
    const [items, setItems] = useState(initialData);
    const containerRef = useRef(null);

    const deleteItem = (id)=>{
        setItems(prev=>prev.filter(item=>item.id!==id));
    }

    const completeItem = (id)=>{
        setItems(prev=>prev.map(item=>items.id!==id ? item : {...item, complete:true}))
    }

    const unCompleteItem = (id)=>{
        setItems(prev=>prev.map(item=>items.id!==id ? item : {...item, complete:false}))
    }

    return (
        <>
            <Reorder.Group 
                axis='y' 
                as="div" 
                values={items} 
                onReorder={setItems} 
                className="items-container" 
                ref={containerRef}
            >
                <AnimatePresence initial={false}>
                {
                    items.map(item=>(
                        <Item 
                        key={item.id} 
                        value={item} 
                        containerRef={containerRef} 
                        Delete={deleteItem}
                        complete={completeItem}
                        unComplete={unCompleteItem}
                        />
                        ))
                }
                </AnimatePresence>
            </Reorder.Group>
            <FloatingLink to="/extras">Extras</FloatingLink>
        </>
    )
}

export default Reorder1;
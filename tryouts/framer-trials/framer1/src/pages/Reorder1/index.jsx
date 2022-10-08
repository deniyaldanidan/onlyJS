import React, {useState, useRef} from 'react';
import { FloatingLink } from '../../components/CustLinks';
import {AnimatePresence, Reorder} from 'framer-motion';
import './reorderStyles.scss';
import Item from './Item';
import AddTask from './AddTask';
import {random} from 'lodash';

const initialData = [
        {id: "item_1", emoji: "🍅", name: "Tomato", complete:false}, 
        {id: "item_2", emoji:"🥒", name: "Cucumber", complete:false}, 
        {id: "item_3", emoji:"🧀", name: "Cheese", complete:false}, 
        {id: "item_4", emoji:"🥬", name: "Lettuce", complete:false},
        {id: "item_5", emoji:"🥔", name: "Potato", complete:false},
        {id: "item_6", emoji:"🍕", name: "Pizza", complete:false},
        {id: "item_7", emoji:"🥪", name: "Sandwich", complete:false},
        {id: "item_8", emoji:"🥛", name: "Milk", complete:false}
];

const ascSort = (a,b)=>{
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();

    if (x<y) return -1;
    if (x>y) return 1;
    return 0;
}

const descSort = (a,b)=>{
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();

    if (x>y) return -1;
    if (x<y) return 1;
    return 0;
}

const Reorder1 = ()=>{
    const [items, setItems] = useState(initialData);
    const containerRef = useRef(null);

    const deleteItem = (id)=>{
        setItems(prev=>prev.filter(item=>item.id!==id));
    }

    const completeItem = (id)=>{
        setItems(prev=>prev.map(item=>item.id!==id ? item : {...item, complete:true}))
    }

    const unCompleteItem = (id)=>{
        setItems(prev=>prev.map(item=>item.id!==id ? item : {...item, complete:false}))
    }

    const addItem = (name, emoji)=>{
        let id = `item_${random(88, 100000)}`;
        setItems(prev=>[...prev, {id: id, emoji, name, complete:false}])
    }

    const ascDescHandler = (desc=false)=>{
        const newItems = items.slice();
        desc ? newItems.sort(descSort) : newItems.sort(ascSort);
        setItems(newItems);
    }

    return (
        <>
            <div className="wrapper">
            <div className="sort-by-btns">
                <button className="sort-btn" onClick={()=>ascDescHandler()} >Sort by ASC</button>
                <button className="sort-btn" onClick={()=>ascDescHandler(true)} >Sort by DESC</button>
            </div>
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
            <AddTask addFunc={addItem} />
            </div>
            <FloatingLink to="/extras">Extras</FloatingLink>
        </>
    )
}

export default Reorder1;
import React, {useState, useRef} from 'react';
import { FloatingLink } from '../../components/CustLinks';
import {AnimatePresence, Reorder} from 'framer-motion';
import './reorderStyles.scss';
import Item from './Item';
import AddTask from './AddTask';
import {random} from 'lodash';

// Sort by Name ASC|DESC

const initialData = [
        {id: "item_1", data: "🍅 Tomato", complete:false}, 
        {id: "item_2", data:"🥒 Cucumber", complete:false}, 
        {id: "item_3", data:"🧀 Cheese", complete:false}, 
        {id: "item_4", data:"🥬 Lettuce", complete:false},
        {id: "item_5", data:"🥔 Potato", complete:false},
        {id: "item_6", data:"🍕 Pizza", complete:false},
        {id: "item_7", data:"🥪 Sandwich", complete:false},
        {id: "item_8", data:"🥛 Milk", complete:false}
];

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
        setItems(prev=>[...prev, {id: id, data: `${emoji} ${name}`, complete:false}])
    }

    return (
        <>
            <div className="wrapper">
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
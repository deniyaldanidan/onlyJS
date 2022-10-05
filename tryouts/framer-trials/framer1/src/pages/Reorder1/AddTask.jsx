import React, {useState} from 'react';
import {MdAddTask} from 'react-icons/md';
import {motion, AnimatePresence} from 'framer-motion';

const emojiList = ["🍇", "🍉", "🍊", "🥭", "🍍", "🍎", "🍒", "🍓", "🥝", "🌮", "🥙", "🍚", "🍜", "🥗", "🍿", "🍅", "🥒", "🥬", "🧀", "🥔", "🍕", "🥪", "🥛", "🍗", "🍖", "🥩"]

const selectVariants = {
    hidden: {
        opacity: 0,
        y: -30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            type: "spring"
        }
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: {
            duration: 0.5,
            type: "spring"
        }
    }
};

const MyMotionBTN = ({children, className, onClick})=>(
    <motion.button 
        className={className} 
        onClick={onClick}
        initial={{scale:1}} 
        whileHover={{
            scale:[1, 1.1, 1], 
            transition: {
                duration:1.2, 
                type:"spring", 
                repeat:"Infinity"
            }
        }}
    >
        {children}
    </motion.button>
);

const AddTask = ({addFunc})=>{
    const [name, setName] = useState("");
    const [emojis, setEmojis] = useState(emojiList[0]);
    const [selectState, setSelectState] = useState(false);

    const emojiSelectHandler = (emo)=>{
        setSelectState(false);
        setEmojis(emo)
    }

    const selectTogg = ()=>setSelectState(prev=>!prev);

    const submitHandler = ()=>{
        (name && emojis) && addFunc(name, emojis);
        resetHandler();
    }

    const resetHandler = ()=>{
        setName("")
        setEmojis("")
    }

    return (
        <div className="add-task">
            <div className="input-sec">
                <label htmlFor="task-name">Task Name</label>
                <input type="text" id="task-name" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="select-sec">
                <div className="display-select" onClick={selectTogg}>Selected Emoji: {emojis}</div>
                <AnimatePresence mode='wait'>
                { selectState && (<motion.div className="select-options" variants={selectVariants} initial="hidden" animate="visible" exit="exit">
                    {emojiList.map(emo=><div className="option" key={emo} onClick={()=>emojiSelectHandler(emo)}>{emo}</div>)}
                </motion.div>) }
                </AnimatePresence>
            </div>
            <div className="btns">
                <MyMotionBTN className='submit-btn' onClick={submitHandler}  ><MdAddTask/> Add</MyMotionBTN>
                <MyMotionBTN className="reset-btn" onClick={resetHandler}>Cancel</MyMotionBTN>
            </div>
        </div>
    );
}

export default AddTask;
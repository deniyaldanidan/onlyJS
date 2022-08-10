import React, {useState} from 'react'
import MySelect from './MySelect'
import '../../styles/search-box/searchbox.scss';
import {IoSearch} from 'react-icons/io5';
import {motion, AnimatePresence} from 'framer-motion';

const boxAnim = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.1
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1
        }
    }
}

const SearchBox = ({list1, list2, list3}) => {
  
    const [select1, setSelect1] = useState(list1[0]);
    const [select2, setSelect2] = useState(list2[0]);
    const [select3, setSelect3] = useState(list3[0]);

    return (
        <AnimatePresence>
        <motion.div 
            variants={boxAnim}
            initial="hidden"
            animate="visible"
            exit="hidden"
         className='search-box'>
            <MySelect display={select1} opts={list1} chooseOptFnc={setSelect1} />
            <MySelect display={select2} opts={list2} chooseOptFnc={setSelect2} />
            <MySelect display={select3} opts={list3} chooseOptFnc={setSelect3} />
            <button className='search-btn'><span>Search</span> <IoSearch/></button>
        </motion.div>
        </AnimatePresence>
    )
}

export default SearchBox
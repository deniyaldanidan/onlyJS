import React, {useState, useRef} from 'react';
import {BsSearch} from 'react-icons/bs';
import {AnimatePresence, motion} from 'framer-motion';
import useClickOutside from '../../hooks/useClickOutside';


const dropDownAnim = {
  hidden: {
    y: ["-25px", "-50px", "-100px", "-100px", "-100px"],
    scale: [1, 0.75, 0.5, 0.25, 0],
    opacity: [0.5, 0.25, 0.1, 0, 0],
    transition: {
      duration: .3,
      type: "spring"
    }
  },
  visible: {
    y: 0,
    scale: 1,
    opacity:1,
    transition: {
      duration: .3,
      type: "spring"
    }
  }
}

const MySelect = ({display, opts, chooseOptFnc}) => {

  const [showDrop, setShowDrop] = useState(false);
  const [search, setSearch] = useState("");
  const dropRef = useRef();
  
  useClickOutside(dropRef, ()=>{
    if (showDrop) setShowDrop(false)
  })

  const optionClicked = (opt)=>{
    chooseOptFnc(opt);
    setShowDrop(false);
  }

  return (
    <div className='my-select'
      ref={dropRef}
    >
        <div className={`select-display ${showDrop?"dropped": ""}`} onClick={()=>setShowDrop(prev=>!prev)}>
          <span>
            {display}
          </span>
        </div>
        <AnimatePresence>
        { showDrop && <motion.div 
          className="select-dropdown"
          variants={dropDownAnim}
          initial="hidden"
          animate="visible"
          exit="hidden"
          >
          <div className="select-search">
            <button><BsSearch/></button>
            <input placeholder='Search...' value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="select-opts">
            {opts.filter(opt=>opt.toLowerCase().includes(search.toLowerCase())).map((opt, index)=>(
              <div key={index} className={`select-opt ${(opt===display) ?"selected-opt": ""}`} onClick={()=>optionClicked(opt)} >{opt}</div>
              ))}
          </div>
        </motion.div>}
        </AnimatePresence>
    </div>
  )
}

export default MySelect
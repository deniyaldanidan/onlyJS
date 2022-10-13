import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Bg from './Bg';

const toolTipAni = {
  initial:{ opacity:0 },
  animate: {opacity:1, transition: {duration:0.3}},
  exit: {opacity:0, transition: {duration:0.3}}
}

const labelAni = {
  initial: {opacity:0, y:-10},
  animate: {opacity:1, y:0, transition: {duration:0.35}},
  exit: {opacity:0, y:10, transition: {duration:0.35}}
}

const ToolTip = ({name, multi, multiData})=>{
  return (
    <>
      <motion.div className='tool-tip' variants={toolTipAni} initial="initial" animate="animate" exit="exit">
        {
          !multi ? <span className='single'>{name}</span> : (
            multiData.map(grp=>(
              <React.Fragment key={grp.listName}>
              <div className="multi-head">{grp.listName}</div>
              {
                grp.data.map(mname=><span className='single' key={mname}>{mname}</span>)
              }
              </React.Fragment>
            ))
          )
        }
      </motion.div>
      <motion.div className='attacher' variants={toolTipAni} initial="initial" animate="animate" exit="exit" />
    </>
  );
}

const SideMenu = ({navState, icon, name, multi, multiData}) => {
  const [hoverState, setHoverState] = useState(false);

  return (
    <motion.div className='side-menu'
      onMouseEnter={()=>setHoverState(true)}
      onMouseLeave={()=>setHoverState(false)}
      initial={{opacity:0, y:-3}}
      animate={{opacity:1, y:0}}
      exit={{opacity:0, y:-3}}
      transition={{duration:0.35}}
    >
      <motion.div className="content-box">
        <motion.span className='menu-icon'>{icon}</motion.span>
        <AnimatePresence>
          {navState && <motion.span className='menu-name' variants={labelAni} initial="initial" animate="animate" exit="exit">{name}</motion.span>}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {hoverState && <Bg/>}
        {(hoverState && multi) && <ToolTip key="multi-tip" multi={multi} multiData={multiData} />}
        {
          (hoverState && !navState && !multi) && <ToolTip name={name} key="tip" />
        }
      </AnimatePresence>
      {
        (multi && navState) && <div className="right-arrow"></div>
      }
    </motion.div>
  )
}

export default SideMenu;
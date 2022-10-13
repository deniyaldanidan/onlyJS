import React, { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import {AiOutlineClockCircle, AiOutlineAppstore, AiOutlineLineChart} from 'react-icons/ai';
import {BsLayoutWtf, BsTag, BsCalendarCheck} from 'react-icons/bs';
import {BiUserCircle} from 'react-icons/bi';
import {FiFileText} from 'react-icons/fi';
import {VscCalendar} from 'react-icons/vsc';
import {TbCalendarTime} from 'react-icons/tb';
import {IoStatsChartOutline, IoSettingsOutline} from 'react-icons/io5';
import {RiTeamLine} from 'react-icons/ri';
import SideMenu from './SideMenu';
import MoreBTN from './MoreBTN';

const reportsList = [
  {
    listName: "time",
    data: ['summary', "detailed", "weekly", "shared"]
  },
  {
    listName: "team",
    data: ["scheduled"]
  },
  {
    listName: "expense",
    data: ["detailed"]
  }
]

const SideBar = ({navState}) => {
  const [show, setShow] = useState(false);

  return (
    <motion.div className="sidebar" transition={{duration:0.4}}>
      <SideMenu navState={navState} icon={<AiOutlineClockCircle/>} name="Time Tracker" />
      <SideMenu navState={navState} icon={<FiFileText/>} name="Projects" />
      <SideMenu navState={navState} icon={<VscCalendar/>} name="Calender" />
      <SideMenu navState={navState} icon={<AiOutlineAppstore/>} name="Dashboard" />
      <SideMenu navState={navState} icon={<IoStatsChartOutline/>} name="Reports" multi={true} multiData={reportsList} />
      <SideMenu navState={navState} icon={<RiTeamLine/>} name="Team" />
      <SideMenu navState={navState} icon={<BiUserCircle/>} name="clients" />
      <SideMenu navState={navState} icon={<BsTag/>} name="Tags" />
      <SideMenu navState={navState} icon={<IoSettingsOutline/>} name="settings" />
      <MoreBTN onClick={()=>setShow(prev=>!prev)} show={show} navState={navState} />
      <AnimatePresence>
        {show && (
          <>
          <SideMenu navState={navState} icon={<TbCalendarTime/>} name="timesheet" />
          <SideMenu navState={navState} icon={<BsLayoutWtf/>} name="Schedule" />
          <SideMenu navState={navState} icon={<AiOutlineLineChart/>} name="activity" />
          <SideMenu navState={navState} icon={<BsCalendarCheck/>} name="approvals" />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SideBar;
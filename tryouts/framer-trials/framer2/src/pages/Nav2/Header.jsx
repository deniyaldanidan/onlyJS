import React from 'react'
import {AiOutlineMenu} from 'react-icons/ai';
import {IoIosHelpCircleOutline, IoIosNotificationsOutline} from 'react-icons/io'

const Header = ({navTogg}) => {
  return (
    <div className="header">
        <div className="head-g-1">
            <div className="sidebar-btn" onClick={navTogg}><AiOutlineMenu/></div>
            <div className="head-logo">Clockify</div>
        </div>
        <div className="head-g-2">
            <div className="menu">User's Workspace</div>
            <div className="header-cta">UPGRADE</div>
            <div className="menu-icon"><IoIosHelpCircleOutline/></div>
            <div className="menu-icon"><IoIosNotificationsOutline/></div>
            <div className="profile">DD</div>
        </div>
    </div>
  )
}

export default Header;
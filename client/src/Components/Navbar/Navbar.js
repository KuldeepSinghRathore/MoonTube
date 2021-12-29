import React, { useState } from "react"
// import menu from "/images/menu.png"
import { MdNotifications } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"

import { Link } from "react-router-dom"
import { SidebarData } from "./SidebarData"
import "./Navbar.css"
import { IconContext } from "react-icons"
import menu from "images/menu.png"
import logo from "images/logo.png"
import upload from "images/upload.png"
import more from "images/more.png"
import notification from "images/notification.png"
import jack from "images/Jack.png"
import search from "images/search.png"
import "./Navbar.css"
// import { SidebarData } from "./SidebarData"
const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  return (
    <>
      <IconContext.Provider value={{ color: "#060b26" }}>
        <div className="nav flex-div">
          <div className="nav-left flex-div">
            {showSidebar ? (
              <AiOutlineClose
                size={25}
                className="menu-icon"
                onClick={toggleSidebar}
              />
            ) : (
              <img
                src={menu}
                alt="menu"
                className="menu-icon"
                onClick={toggleSidebar}
              />
            )}
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="nav-middle flex-div">
            <div className="search-box flex-div">
              <input type="text" placeholder="Search" />
              <img src={search} />
            </div>
          </div>
          <div className=" nav-right flex-div">
            <img src={upload} alt="upload" className="img" />
            <img src={more} alt="more" className="img" />

            {/* <MdNotifications size={25} color={"gray"} className="img" /> */}

            <img src={notification} alt="notification" className="img" />
            <img src={jack} alt="jack" className="user-icon img" />
          </div>
        </div>

        <nav className={showSidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={toggleSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="title">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar

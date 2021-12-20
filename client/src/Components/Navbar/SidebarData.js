import React from "react"
import * as FaIcons from "react-icons/fa"

import * as IoIcons from "react-icons/io"
import * as MdIcons from "react-icons/md"
import { BiLike } from "react-icons/bi"
export const SidebarData = [
  {
    title: "History",
    path: "/",
    icon: <FaIcons.FaHistory size={25} />,
    cName: "nav-text",
  },
  {
    title: "Playlists",
    path: "/playlist",
    icon: <MdIcons.MdPlaylistPlay size={25} />,
    cName: "nav-text",
  },
  {
    title: "Watch Later",
    path: "/products",
    icon: <MdIcons.MdWatchLater size={25} />,
    cName: "nav-text",
  },
  {
    title: "Liked Videos",
    path: "/team",
    icon: <BiLike size={25} />,
    cName: "nav-text",
  },
]

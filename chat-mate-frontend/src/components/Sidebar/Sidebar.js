import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from '../SidebarChat/SidebarChat';
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src=""/>
                <div className="sidebar_header_right">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_search_container">
                    <SearchOutlinedIcon/>
                    <input placeholder="Search or start a new chat" type="text">
                    </input>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat></SidebarChat>
                <SidebarChat></SidebarChat>
                <SidebarChat></SidebarChat>
            </div>
        </div>
    )
}

export default Sidebar

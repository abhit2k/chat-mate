import { Avatar } from '@material-ui/core'
import React from 'react'
import "./SidebarChat.css"
function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className = "sidebarChat_info">
                <h2>Room name</h2>
                <p>This is last bmessage </p>
            </div>
        </div>
    )
}

export default SidebarChat

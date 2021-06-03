import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState } from 'react'
import axios from '../../axios.js'
import "./Chat.css"
function Chat(props) {
    const alpha = props.messages;

    const [input,setInput] = useState("");

    //console.log(typeof(alpha))
    const messages = JSON.parse(alpha)
    //console.log(messages)
    const sendMessage = async (e) => {
        e.preventDefault();// stop refresh on pressing enter

        await axios.post('/messages/new',{
            message:input,
            name:"Hardcoded value",
            timestamp:"Just now",
            received:true
        })
        setInput("");
    }
    
    return (
        <div className = "chat">
            <div className = "chat_header">
                <Avatar/>
                <div className="chat_header_info">
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {
                    messages.map((message) => {
                        return (<p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                    </p>)
                    })
                }
                    
              
            </div>


            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value = {input} onChange = {e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type = "text"
                    />
                    <button 
                        onClick={sendMessage}
                        type = "submit">
                        Send a message 
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat

import React, { useEffect, useState }  from 'react'
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Pusher from 'pusher-js'
import axios from './axios'
function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    // for fetching initial messages 
    axios.get('/messages/sync')
      .then( (response) => {
        //console.log(response.data)
        setMessages(response.data)
      })
  },[])

  

  useEffect(() => {
    const pusher = new Pusher('1b8c9d878edc557d4975', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])// keep olod ones but also add new one
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages]);

  // console.log(`type of messages ${typeof(messages)} ${JSON.stringify(messages)}`)


  return (
    <div className="app">
      <div className = "app_body">
        <Sidebar></Sidebar>
        <Chat messages = {JSON.stringify(messages)}></Chat>
      </div>
    </div>
  );
}

export default App;

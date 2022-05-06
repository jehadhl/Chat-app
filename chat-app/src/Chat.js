import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket ,username , room}) {

  const [currentMessage ,setCurrentMessage] =useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async() => {
    if(currentMessage !== "") {
      const messsagData = {
        room: room,
        auttor:username,
        message:currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit('send_message',messsagData)
      setMessageList((list) => [...list ,messsagData])
      setCurrentMessage("")
    }
  };
  useEffect(()=> {
          socket.on('receive_message',(data)=> {
            setMessageList((list) => [...list ,data])
          })
          
  },[socket])

  return (
    <div className='chat-window'>
        <div className='chat-header'>
        <p><span>.</span>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>
              {messageList.map((messageContent)=>{
                return (
                 <div className='message' id={username === messageContent.auttor ? "you" : "other"}>
                   <div>
                          <div className='message-content'>
                            <p>{messageContent.message}</p>
                          </div>
                          <div className='message-meta'>
                            <p className='p-time'>{messageContent.time}</p>
                            <p className='p-auttor'>{messageContent.auttor}</p>
                          </div>
                          
                   </div>
                 </div>
                )
              })}
              </ScrollToBottom>
        </div>
        <div className='chat-footer'> 
             <input type='text' value={currentMessage}  placeholder='Hey......' onChange={(e)=> {
                  setCurrentMessage(e.target.value)
             }}
             onKeyPress={(e)=> {
               e.key === "Enter" && sendMessage()
             }}/>
             <button onClick={sendMessage}>&#9658;</button>
        </div>
        
    </div>
  )
}

export default Chat;
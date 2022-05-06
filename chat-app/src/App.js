
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';
import image from './images/react.png'
import image2 from './images/node.png'
import image3 from './images/download.png'


const socket = io.connect('http://localhost:3001')

function App() {
  const [username,setUser]=useState('')
  const [room,setRoom]=useState('')
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
      if(username !== "" && room !== ""){
          socket.emit('join_room', room)
          setShowChat(true);
      }
  };

  const leaveRoom = () => {
    setShowChat(false)
};

  return (
    <div className="App">
     
    {!showChat ? (
      <div className="joinChatContainer">
         <div className='images'>
           <img src={image} className='img'/>
           <span className='span'>+</span>
           <img src={image2} className='img'/>
           <span className='span'>+</span>
           <img src={image3} className='img'/>
         </div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => {
        setUser(e.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
        required
      />
      <button onClick={joinRoom} >Join A Room</button>
    </div>
      )
      : (
        <div>
        <Chat socket={socket} username={username} room={room} />
        <button onClick={leaveRoom} className="leave-room">leave room</button>
        </div>

        )}
      </div>
     );
    }


export default App;

import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://chatworld-9fma.onrender.com/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const[roomId, setRoomID] = useState("Click on Generate Room ID");
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const generateRoomID = () => {
    setRoomID(Math.random().toString(36).substring(7));
  }
  return (
    <div className="App">
      
      {!showChat ? (
        <div>
          
        
        <div className="joinChatContainer">
          <h1 className="mainheading">Welcome to the Chat World</h1>
          <h3>Join A Chat</h3>
          <div>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
          </div>
        </div>
        <div className="generateRoomID">
          <div className="generateRoomIDchild">
          <button onClick={generateRoomID}>Generate Room ID</button>
          </div>
        </div>
        <div className="generateRoomIDchild">
          <h2>Room ID: {roomId}</h2>
        </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";

const Join = ({ setUsername, setRoom, room, username, socket }) => {
  const navigate = useNavigate()

  const joinChat = async () => {
      if(username && room){
        const data = {
          username,
          room
        }
          await socket.emit("join_chat", data)
          navigate('/chat')
      }
  };

  return (
    <div className="join-container">
      <div className="user-form">
        <h2>Connent to a person!</h2>
        <input
          type="text"
          placeholder="create a name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter a room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className="join-btn" onClick={joinChat}>Join!</button>
      </div>
    </div>
  );
};

export default Join;

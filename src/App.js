import "./App.css";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import Chat from "./pages/Chat";
import { useState } from "react";
import Navbar from "./Navbar";

const socket = io.connect(process.env.REACT_APP_SOCKET_IO);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");


  return (
    <BrowserRouter>
      <div className="App">
        <Navbar room={room} username={username} socket={socket} />
        <Routes>
          <Route
            path="/"
            element={
              <Join
                setUsername={setUsername}
                setRoom={setRoom}
                room={room}
                username={username}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat room={room} username={username} socket={socket} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

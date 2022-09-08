import React from "react";
import { FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({socket, username, room }) => {
    // disconnect from chat
    const disconnect = async () => {

      const user = {
        username,
        room,
      }
  
      await socket.emit("exit_chat", user)
      await socket.disconnect()
      await socket.connect()
    }
  return (
    <nav>
      <FaRegComments size="3em" style={{ marginRight: "1em" }} />
      <Link to='/' onClick={disconnect}><h1>OniQuickChat</h1></Link>
      
    </nav>
  );
};

export default Navbar;

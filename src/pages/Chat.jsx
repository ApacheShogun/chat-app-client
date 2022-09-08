import { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();



  // send message
  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        id: uuidv4(),
        room,
        username,
        message: currentMessage,
        broadcast: false,
        time: new Date(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");

    }
  };

  // disconnect from chat
  const disconnect = async () => {
    navigate("/");

    const user = {
      username,
      room,
    };

    await socket.emit("exit_chat", user);
    await socket.disconnect();
    await socket.connect();
  };

  useEffect(() => {
    if (!username && !room) {
      navigate("/");
    }

    socket.on("get_message", (data) => {
      console.log(data);
      setMessageList((prev) => [...prev, data]);
    });

    socket.on("user_connected", (data) => {
      console.log(data);
      const userconnected = {
        id: uuidv4(),
        room,
        username,
        message: data,
        broadcast: true,
        time: new Date(),
      };

      setMessageList((prev) => [...prev, userconnected]);
    });

    socket.on("user_disconnected", (data) => {
      console.log(data);
      const userDisconnected = {
        id: uuidv4(),
        room,
        username,
        message: data,
        broadcast: true,
        time: new Date(),
      };

      setMessageList((prev) => [...prev, userDisconnected]);
    });

  }, [socket, navigate, room, username, ]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <h2>{room}</h2>
          <button className="disconnect-btn" onClick={disconnect}>
            disconnect
          </button>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((m) =>
              m.broadcast ? (
                <p className="user-connected" key={m.id}>
                  {m.message}
                </p>
              ) : (
                <div
                  className="message"
                  id={username === m.username ? "you" : "them"}
                  key={m.id}
                >
                  <div className="message-body">
                    <p>{m.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{m.username}</p>
                    {/* <p>{m.time}</p> */}
                  </div>
                </div>
              )
            )}
          </ScrollToBottom>
        </div>
        <div className="chat-sender">
          
          <input
            type="text"

            value={currentMessage}
            placeholder="type here!"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          />
          <div className="send-btn" onClick={sendMessage}>
            <IoSendSharp />
          </div>
        </div>


      </div>
    </div>
  );
};

export default Chat;

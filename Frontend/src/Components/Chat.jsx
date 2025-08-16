import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket"; // ✅ correct import
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useRef } from "react";

const Chat = () => {
  const { target_id } = useParams();
  const user = useSelector((store) => store.user);
  const connection = useSelector((store) => store.connection);

  const target_user = connection.find(
    (connection) => connection._id === target_id
  );

  const fullName = target_user
    ? `${target_user.firstName} ${target_user.lastName}`
    : "Unknown User";

  const user_id = user?._id;

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + target_id, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => ({
      username: `${msg.senderId?.firstName} ${msg.senderId?.lastName}`,
      text: msg.text,
      time: new Date(msg.createdAt).toLocaleTimeString(),
      sentByMe: msg.senderId?._id === user_id,
    }));

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [target_id]);

  useEffect(() => {
    if (!user_id) {
      return;
    }
    const socket = createSocketConnection();
    socketRef.current = socket;
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      user_id,
      target_id,
    });

    socket.on("messageReceived", ({ senderId, firstName, lastName, text }) => {
      setMessages((prev) => [
        ...prev,
        {
          username: `${firstName} ${lastName}`,
          text,
          time: new Date().toLocaleTimeString(),
          sentByMe: senderId === user_id,
        },
      ]);
    });

    return () => {
      socket.disconnect();
      // socketRef.current = null;
    };
  }, [user_id, target_id]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMsg = {
      username: `${user.firstName} ${user.lastName}`,
      text: messageText,
      time: new Date().toLocaleTimeString(),
      sentByMe: true,
    };

    // Use the single socket connection
    socketRef.current?.emit("sendMessage", {
      ...newMsg,
      user_id,
      target_id,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    setMessages((prev) => [...prev, newMsg]);
    setMessageText("");
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[90vh] flex flex-col bg-base-200 rounded-lg shadow-lg border border-base-300">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-semibold py-3 rounded-t-lg">
        💬 Chat with {fullName}
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${msg.sentByMe ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">
              {msg.username}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div
              className={`chat-bubble ${
                msg.sentByMe ? "chat-bubble-accent" : "chat-bubble-info"
              }`}
            >
              {msg.text}
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 flex gap-2 border-t border-base-300">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered w-full"
        />
        <button onClick={sendMessage} className="btn btn-accent">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

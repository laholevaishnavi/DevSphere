import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../utils/socket"; // ✅ correct import

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

  useEffect(() => {
    if (user_id && target_id) {
      socket.emit("joinChat", { user_id, target_id });
    }

    socket.on("messageReceived", ({ firstName, user_id: senderId, text }) => {
  if (senderId === user_id) return; // Don't add your own message again

  setMessages((prev) => [
    ...prev,
    {
      username: firstName,
      time: new Date().toLocaleTimeString(),
      text,
      sentByMe: false,
    },
  ]);
});


    return () => {
      socket.off("messageReceived");
    };
  }, [user_id, target_id]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      user_id,
      target_id,
      text: messageText,
    });

    setMessages((prev) => [
      ...prev,
      {
        username: `${user.firstName} ${user.lastName}`,
        time: new Date().toLocaleTimeString(),
        text: messageText,
        sentByMe: true,
      },
    ]);

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
  <div key={idx} className={`chat ${msg.sentByMe ? "chat-end" : "chat-start"}`}>
    <div className="chat-header">
      {msg.username}
      <time className="text-xs opacity-50 ml-2">{msg.time}</time>
    </div>
    <div className={`chat-bubble ${msg.sentByMe ? "chat-bubble-accent" : "chat-bubble-info"}`}>
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

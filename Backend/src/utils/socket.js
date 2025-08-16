import { Server } from "socket.io";
import Chat from "../models/chat.js";

const initializeSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  })
  io.on("connection", (socket) => {
    //code to handle events !
    socket.on("joinChat", ({ user_id, target_id }) => {
      const roomId = [user_id, target_id].sort().join("_")
      console.log(roomId);
      socket.join(roomId)

    })
    socket.on("sendMessage", async ({
      firstName, lastName, user_id, target_id, text, }) => {
      const roomId = [user_id, target_id].sort().join("_");
      console.log(`${firstName, lastName} sends the message : ${text}`);
      let chat = await Chat.findOne({
        participants: { $all: [user_id, target_id] },
      });

      if (!chat) {
        chat = new Chat({
          participants: [user_id, targetUserId],
          messages: [],
        });
      }

      chat.messages.push({
        senderId: user_id,
        text,
      });

      await chat.save();
    io.to(roomId).emit("messageReceived", {
    senderId: user_id,
    firstName,
    lastName,
    text,
  });

      
    })
    socket.on("disconnect", () => { })
  });
};
export default initializeSockets
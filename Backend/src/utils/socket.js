import { Server } from "socket.io";


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
    socket.on("sendMessage", ({
      firstName, lastName, user_id, target_id, text, }) => {
      const roomId = [user_id, target_id].sort().join("_");
      console.log(`${firstName, lastName} sends the message : ${text}`);

      io.to(roomId).emit("messageReceived", { firstName, user_id, text });
    })
    socket.on("disconnect", () => { })
  });
};
export default initializeSockets
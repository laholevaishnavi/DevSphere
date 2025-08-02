// import io from "socket.io-client"


// export const createSocketConnection = ()=>{
//   return io("http://localhost:7777");
// }
// utils/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:7777", {
  withCredentials: true, // optional depending on auth
});

export default socket;

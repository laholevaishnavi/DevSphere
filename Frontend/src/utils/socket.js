import io from "socket.io-client"


export const createSocketConnection = ()=>{
  return io("http://localhost:7777" , {
    withCredentials : true,
  });
}
// utils/socket.js
// import { io } from "socket.io-client";

// const socket = io("http://localhost:7777", {
//   withCredentials: true, // optional depending on auth
// });

// export default socket;


// import { io } from "socket.io-client";

// const socket = io("http://localhost:7777", {
//   withCredentials: true,
//   transports: ['websocket', 'polling'],
//   timeout: 5000,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// socket.on('connect', () => {
//   console.log('Connected to server');
// });

// socket.on('connect_error', (error) => {
//   console.error('Socket connection error:', error.message);
// });

// socket.on('disconnect', (reason) => {
//   console.log('Socket disconnected:', reason);
// });

// export default socket;

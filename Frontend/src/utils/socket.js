// import io from "socket.io-client"


// export const createSocketConnection = ()=>{
//   return io("http://localhost:7777" , {
//     withCredentials : true,
//   });
// }
import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};

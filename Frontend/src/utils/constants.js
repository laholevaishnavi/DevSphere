const api = import.meta.env.VITE_BACKEND_URL 

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" :  "/"+api ;
// export const BASE_URL =
//   import.meta.env.VITE_BACKEND_URL || "http://localhost:7777";

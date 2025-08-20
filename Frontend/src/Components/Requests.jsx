import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.request) || [];
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const req = await axios.get(BASE_URL + 
        "/user/request/received",
        { withCredentials: true }
      );

      dispatch(addRequest(req.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAccept = async (id) => {
    try {
      
      await axios.post(
        BASE_URL + `/request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  };

  const handleIgnore = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error("Failed to ignore request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 px-4 py-8 text-base-content">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Connection Requests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length === 0 ? (
          <p className="text-center text-gray-400">No pending requests.</p>
        ) : (
          requests.map((user) => (
            <div
              key={user._id}
              className="card bg-base-100 shadow-xl border border-base-300"
            >
              <div className="card-body items-center text-center">
                <div className="avatar mb-3">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoUrl}
                      alt={`${user.fromUserId.firstName} ${user.fromUserId.lastName}`}
                    />
                  </div>
                </div>
                <h2 className="card-title">
                  {user.fromUserId.firstName} {user.fromUserId.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.bio}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAccept(user._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => handleIgnore(user._id)}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Requests = () => {
//   const [requests, setRequests] = useState([]);

//   // Fetch connection requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get("http://localhost:7777/user/requests", {
//           withCredentials: true,
//         });
//         setRequests(res.data); // assume array of user objects
//       } catch (err) {
//         toast.error("Failed to load requests");
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Accept connection
//   const handleAccept = async (id) => {
//     try {
//       await axios.post(
//         `http://localhost:7777/user/accept/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       toast.success("Connection accepted!");
//       setRequests((prev) => prev.filter((req) => req._id !== id));
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   // Ignore request
//   const handleIgnore = async (id) => {
//     try {
//       await axios.post(
//         `http://localhost:7777/user/ignore/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       toast("Request ignored", { icon: "👋" });
//       setRequests((prev) => prev.filter((req) => req._id !== id));
//     } catch {
//       toast.error("Could not ignore request");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 px-4 py-8 text-base-content">
//       <h2 className="text-3xl font-bold text-center text-white mb-6">Connection Requests</h2>

//       {requests.length === 0 ? (
//         <p className="text-center text-gray-400">No pending requests.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {requests.map((user) => (
//             <div
//               key={user._id}
//               className="card bg-base-100 shadow-xl border border-base-300"
//             >
//               <div className="card-body items-center text-center">
//                 <div className="avatar mb-3">
//                   <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                     <img src={user.photo || "/default-avatar.png"} alt={user.firstName} />
//                   </div>
//                 </div>
//                 <h2 className="card-title">{user.firstName} {user.lastName}</h2>
//                 <p className="text-sm text-gray-500">{user.bio || "No bio provided."}</p>
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => handleAccept(user._id)}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="btn btn-outline btn-error btn-sm"
//                     onClick={() => handleIgnore(user._id)}
//                   >
//                     Ignore
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Requests;

// const dummyRequests = [
//   {
//     _id: "1",
//     firstName: "Aarav",
//     lastName: "Verma",
//     bio: "Frontend Developer | React Enthusiast",
//     photo: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     _id: "2",
//     firstName: "Diya",
//     lastName: "Sharma",
//     bio: "UI/UX Designer | Minimalist Thinker",
//     photo: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     _id: "3",
//     firstName: "Kunal",
//     lastName: "Joshi",
//     bio: "MERN Stack Dev | Open Source Contributor",
//     photo: "https://randomuser.me/api/portraits/men/76.jpg",
//   },
// ];
//  const handleAccept = (id) => {
//     alert(`Accepted request from user ID: ${id}`);
//   };

//   const handleIgnore = (id) => {
//     alert(`Ignored request from user ID: ${id}`);
//   };

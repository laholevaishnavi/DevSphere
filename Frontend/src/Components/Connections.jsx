import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnection } from "../utils/connectionSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(connections);

  const handleRemoveConnection = async (touserId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeConnection(toUserId));
      console.log("Remove Connection :", toUserId);
    } catch (error) {
      console.log(error);
    }
  };
  const viewProfile = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConnectionData = async () => {
    try {
      const connection = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      console.log(connection.data.data);
      dispatch(addConnections(connection.data.data));
    } catch (error) {

      throw new Error("Error" + error.message);
    }
  };

  useEffect(() => {
    fetchConnectionData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {connections.map((user) => (
        <div
          key={user._id}
          className="card bg-base-100 shadow-xl border border-base-300"
        >
          <div className="card-body items-center text-center">
            <div className="avatar mb-3">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photo} alt={user.firstName} />
              </div>
            </div>
            <h2 className="card-title">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500">{user.bio}</p>
            <div className="mt-4 flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => {
                  viewProfile();
                }}
                className="btn btn-outline btn-primary btn-sm"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  handleRemoveConnection(user._id);
                }}
                className="btn  btn-outline btn-error btn-sm"
              >
                Remove
              </button>
              <button
                className="btn btn-outline btn-accent btn-sm"
                onClick={() => navigate(`/chats/${user._id}`)}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;

// const dummyConnections = [
//   {
//     _id: "1",
//     firstName: "Ishita",
//     lastName: "Mehta",
//     photo: "https://randomuser.me/api/portraits/women/48.jpg",
//     bio: "Security Analyst | Python Enthusiast",
//   },
//   {
//     _id: "2",
//     firstName: "Rohan",
//     lastName: "Kapoor",
//     photo: "https://randomuser.me/api/portraits/men/59.jpg",
//     bio: "Cloud Engineer | AWS & DevOps",
//   },
//   {
//     _id: "3",
//     firstName: "Sana",
//     lastName: "Shaikh",
//     photo: "https://randomuser.me/api/portraits/women/26.jpg",
//     bio: "ML Researcher | Loves Kaggle",
//   },
// ];

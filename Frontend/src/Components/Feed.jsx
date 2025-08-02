import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, UserRoundIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";


const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  

  // Fetch posts from backend

   const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:7777/user/feed`, {
          withCredentials: true,
        });
        // console.log(res.data.data[1]._id);
        
        dispatch(addFeed(res.data.data))
      //  const usersInFeed = res.data.data
        
        // setPosts(res.data.data || []);

      } catch (err) {
        console.error("Error fetching posts:", err.message);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle interest/ignore
  const handleInterested = async( status, toUserId) => {
    const res = await axios.post(`http://localhost:7777/request/send/${status}/${toUserId}`,{},{withCredentials: true});
    dispatch(removeUserFromFeed(toUserId));
    console.log("Interested in:", toUserId);
    // You can send request to backend here
  };

  const handleIgnore = async(status,toUserId) => {
    const res = await axios.post(`http://localhost:7777/request/send/${status}/${toUserId}`,{},{withCredentials: true});
    dispatch(removeUserFromFeed(toUserId));
    console.log("Not interested in:", toUserId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-primary">🌐 DevSphere Feed</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
          </div>
        ) : feed.length === 0 ? (
          <p className="text-center text-gray-400">No posts available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {feed.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-base-200 border border-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={post.photoUrl || "/default-avatar.png"} alt="User" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {post.firstName} {post.lastName}
                    </h3>
                    {/* Add time if needed */}
                    {/* <p className="text-sm text-gray-400">2 hours ago</p> */}
                  </div>
                </div>

                <div className="mb-3">
                  <h2 className="text-xl font-bold">{post.about}</h2>
                  <p className="text-sm text-gray-300 mt-1">Age: {post.age} | Gender: {post.gender}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(post.skills)
                    ? post.skills
                    : (post.skills || "").split(",")
                  ).map((skill, i) => (
                    <span
                      key={i}
                      className="badge badge-outline border-blue-400 text-blue-300 text-xs"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleInterested("interested", post._id)}
                    className="btn btn-sm btn-success"
                  >
                    Interested
                  </button>
                  <button
                    onClick={() => handleIgnore("ignored",post._id)}
                    className="btn btn-sm btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    Ignore
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;

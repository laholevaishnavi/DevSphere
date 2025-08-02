import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import FeedBackground3D from "./FeedBackground3D";

const Login = () => {
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [EmailId, setEmailId] = useState("rahul@gmail.com");
  const [Password, setPassword] = useState("ShowMan@123");
  const [loggedInPage, setLoggedInPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");
    try {
      const response = await axios.post(
        "http://localhost:7777/login",
        {
          emailId: EmailId,
          password: Password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      toast.dismiss();
      toast.success("Logged in successfully!");
      return navigate("/");
    } catch (err) {
      toast.dismiss();
      toast.error("Login failed! Please check your credentials.");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    toast.loading("Creating Account...");
    try {
      const response = await axios.post(
        "http://localhost:7777/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: EmailId,
          password: Password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      toast.dismiss();
      toast.success("Signed Up successfully!");
      return navigate("/");
    } catch (err) {
      toast.dismiss();
      toast.error("Error occurred while creating an account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      {/* <FeedBackground3D /> */}

      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700 shadow-xl p-8 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-2 animate-fade-in-down">
          Welcome to <span className="text-blue-500">DevSphere</span>
        </h2>
        <p className="text-center text-gray-400 mb-6 animate-fade-in">
          {loggedInPage ? "Login to your account" : "Create New Account"}
        </p>

        <form className="space-y-5 animate-fade-in-up">
          {loggedInPage ? (
            ""
          ) : (
            <>
              <div className="relative">
                <label className="block text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 input input-bordered bg-gray-800 text-white border-slate-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 input input-bordered bg-gray-800 text-white border-slate-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}
          <div className="relative">
            <label className="block text-gray-300 mb-1">Email</label>
            <Mail className="absolute left-3 top-10 text-gray-500 w-5 h-5" />
            <input
              type="email"
              value={EmailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full pl-10 input input-bordered bg-gray-800 text-white border-slate-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-300 mb-1">Password</label>
            <Lock className="absolute left-3 top-10 text-gray-500 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 input input-bordered bg-gray-800 text-white border-slate-600 focus:outline-none focus:border-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 cursor-pointer"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-blue-400">
              Forgot password?
            </a>
          </div>

          {loggedInPage ? (
            <button
              onClick={handleLogIn}
              type="submit"
              className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              Log In
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              type="submit"
              className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              Sign Up
            </button>
          )}
        </form>

        {loggedInPage ? (
          <>
            <div className="mt-4 text-sm text-center text-gray-400">
              Don't have an account?
              <button
                onClick={() => setLoggedInPage(!loggedInPage)}
                className="ml-1 text-blue-500 cursor-pointer hover:underline"
              >
                Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 text-sm text-center text-gray-400">
              Already have an account?
              <button
                onClick={() => setLoggedInPage(!loggedInPage)}
                className="ml-1 text-blue-500 cursor-pointer hover:underline"
              >
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="navbar bg-slate-900 text-white shadow-md px-4">
        {/* Left - Logo */}
        <div className="flex-1">
          <a href="/" className="text-2xl font-bold btn btn-ghost normal-case">
            DevSphere
          </a>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <span className="input  input-sm w-28 md:w-40 bg-slate-800 text-white ">
              Welcome, {user.firstName} !
            </span>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                  <img
                    alt="User"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52 text-white"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile <span className="badge badge-info">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <Link to={"/premium"}>Premium</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

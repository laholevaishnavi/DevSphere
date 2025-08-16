// import React from 'react'
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if(res.data && res.data._id){
        dispatch(addUser(res.data))
      }else{
        navigate("/login")
      }
    } catch (err) {
     if (err.response && (err.response.status === 400 || err.response.status === 401)) {
  navigate("/login");
}
      console.log(err);
    }
  };

useEffect(() => {
  // only fetch if not already a valid user
  if (!userData || !userData._id) {
    fetchUser();
  }
}, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

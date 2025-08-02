import express from "express"
import Chat from "../models/chat";
import userAuth from "../middlewares/auth";
const chatRouter = express.Router();


chatRouter.get("/chat/:targerUserId" , userAuth, async (req,res) => {
  const {targetUserId} = req.params;
  
  
})
import express from "express";
import userAuth from "../middlewares/auth.js";
import { User } from "../models/users.js";
import { ConnectionRequest }from "../models/connectionRequest.js";
const connectionRequestRoute = express.Router();

connectionRequestRoute.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
  //Logic
  //possible status--> ignored and interested
  //touserId must be present in the DB!
  //from userID must be loggedIn user!
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    let status = req.params.status;
    const allowedStatus = ['ignored', 'interested'];
    const isStatusValid = allowedStatus.includes(status);
    if (!isStatusValid) {
      return res.send('Invalid Status received ! Status type : ' + status);
    }
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "User not found!" });
    }
 
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }]
    });

    if (existingConnectionRequest) {
      console.log(existingConnectionRequest);
      
      return res.status(400).json({ message: "Connection Request already Exists!" })
    }
    // status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    const newConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await newConnectionRequest.save();
    res.json({ message: status, data });
    console.log(data);
  } catch (err) {
    throw new Error("Error : " + err.message);

  }
}
)
connectionRequestRoute.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
  //review logic 
  // to userID = loggedin user
  //status --> accepted or rejected 
  //requestId ---> valid 
  try {
    const status = req.params.status;
    const requestId = req.params.requestId;
    const touserId = req.user._id;
    const allowedStatus = ['accepted', 'rejected'];
    const isStatusValid = allowedStatus.includes(status);
    if (!isStatusValid) {
     return res.status(400).send("Invalid Status!")
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: touserId,
      status: "interested",
    })
    if (!connectionRequest) {
     return res.status(400).json({ message: "Connection Request Not Found!" })
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();
   res.json({ message: "Connection Request " + status + "!", data })


  } catch (err) {
   res.status(400).json({ message: err.message })
  }



}
)

export default connectionRequestRoute;
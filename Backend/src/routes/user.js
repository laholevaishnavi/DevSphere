import express from 'express'
import userAuth from '../middlewares/auth.js';
import { User } from '../models/users.js';
import { ConnectionRequest } from '../models/connectionRequest.js';
const userRouter = express.Router();
//list of connection request received -->interested state (pending request)
userRouter.get('/user/request/received', userAuth, async (req, res) => {

  // logic -- touserid = loggedIn user 
  //status interested
  try {

    const loggedInUser = req.user;
    // console.log("Logged in user id:", loggedInUser._id);
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate('fromUserId', 'firstName lastName photoUrl bio');
    // console.log("Connection requests found:", connectionRequests.length);
    // console.log("Connection requests data:", connectionRequests);
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message)

  }
})

//list of active connections of users!
userRouter.get('/user/connections', userAuth, async (req, res) => {

  //logic ---> status : accepted
  //fromuserid or touserid should equals to loggedIN userID
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate('fromUserId', " firstName lastName").populate('toUserId', " firstName lastName");
    // console.log(connectionRequests);


    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });



  } catch (err) {
    res.status(400).send(" ERROR : " + err.message);

  }


})


//list of users in feed
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;    
    const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default userRouter;

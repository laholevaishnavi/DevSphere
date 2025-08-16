import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/users.js";
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.js";
import profileRoute from "./routes/profile.js";
import cors from 'cors';
import connectionRequestRoute from "./routes/connectionRequest.js";
import userRouter from "./routes/user.js";
import PaymentRoute from "./routes/paymentRoute.js";
import http from "http"
import initializeSockets from "./utils/socket.js";
import chatRouter from "./routes/chat.js";
const app = express();
const server = http.createServer(app)
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
))
app.use(express.json());//this middleware is very important b'coz it read the data from the request body and convert it into json 
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', connectionRequestRoute);
app.use('/', profileRoute);
app.use('/', userRouter);
app.use('/', PaymentRoute);
app.use('/', chatRouter);



// find user from the database based on firstName. To do that just go to postman select HTTP->get resquest ->enter URL-> select body->raw-> json and enter data to be find out.
app.get("/user", async (req, res) => {
  const fname = req.body.firstName;
  try {
    const user = await User.find({ firstName: fname });
    if (user.length === 0) {
      res.status(404).send("User not found");
    }
    else {
      res.send(user)
    }
  }
  catch {
    res.status(400).send("Something went Wrong");
  }
});

//getting  the users from db by email
// app.get("/user", async (req, res) => {
//   const userEmail = await req.body.emailId;
//   try {
//     //here users is basically the array of elements(users) having matched emailID.
//     const users = await User.find({ emailId: userEmail });
//     if (users.length == 0) {
//       res.status(404).send("User not found!!");
//     }
//     else {
//       res.send(users);
//     }
//   }
//   catch (err) { res.status(400).send("Something went wrong") }
// })


//creating feed api to get data of all users

app.get("/feed", async (req, res) => {
  try {
    //here users is basically the array of elements(users) having matched emailID.
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found!!");
    }
    else { res.send(users); }
  }
  catch (err) { res.status(400).send("Something went wrong") }

})

//deleting the user from the db
app.delete("/user", async (req, res) => {
  // const user = await User.findByIdAndDelete(_id : userId);
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully", user)

  }
  catch {
    res.status(400).send("Something went wrong");
  }

})

//updating data from the database!
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const Allowed_Updates = ["photoUrl", "about", "skills", "age", "gender", "password"];
    const isUpdateAllowed = Object.keys(data).every((k) => { Allowed_Updates.includes(k) });
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true, returnDocument: "after" });

    res.send("Updation Done Successfully!");
    // res.send(data);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }

})

initializeSockets(server);
connectDB().then(() => {
  console.log("DB Connection Established");
  server.listen(7777, () => {
    console.log('Execution Done!!!! Server is Successfully listening!!!!');
  });
})
  .catch((err) => {
    console.log("DB cannot be connected", err);
  });


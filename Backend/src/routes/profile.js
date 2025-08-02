import express from "express";
import userAuth from "../middlewares/auth.js";
import { validateProfileEditData } from "../utils/validation.js";
const profileRoute = express.Router();

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    throw new Error(err.message);

  }
})

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {

  try {
    const isEditable = validateProfileEditData(req);
  if (!isEditable) { throw new Error("Invalid Edit Request!"); }
  const loggedInUser = req.user;
  Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
  await loggedInUser.save();
  res.json({
    message:`${loggedInUser.firstName}, your profile is updated successfully!`,
    data:loggedInUser,
  });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
    
  }
});
// profileRoute.patch("/profile/passwordChange")





export default profileRoute;
import express from 'express';
import { User } from '../models/users.js';
import bcrypt from 'bcryptjs';
import { validateSignUpData } from '../utils/validation.js';
const authRouter = express.Router();

//we ae creating a signup api for user to enter firstname, lastname , email and password
authRouter.post('/signup', async (req, res) => {
  try {
    //for data validation
    validateSignUpData(req);

    //logic for password encryption..
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!!!!!!!!!!!!");
  } catch (err) {
    res.status(400).send("Error occur while starting the app: " + err.message);
  }
});


authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    }
    else {
      throw new Error("Invalid Credentials!");
    }

  }
  catch (err) {
    res.status(401).send("Error : " + err.message);
  }
})

authRouter.post('/logout', async (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()), });
  res.send("Logout Successful!!")
})

export default authRouter;
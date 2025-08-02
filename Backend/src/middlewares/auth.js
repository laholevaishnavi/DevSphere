import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication token missing. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MyNewSecureRandomKey123!@DevsphereWeb");

    const user = await User.findById(decoded.userId).select("-password"); // exclude password from user object
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token.", error: err.message });
  }
};

export default userAuth;

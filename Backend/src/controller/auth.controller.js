import jwt from "jsonwebtoken";

import User from "../model/User.js";

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const authController = {
  Register: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      //!check all fields have been provided
      if (!email || !password) {
        return res.status(400).json({ message: "All fields must be required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 character long" });
      }
      //!check if the user is exist
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exist" });
      }

      const user = await User.create({ email, password, role });

      res.status(200).json({
        message: "User Registration Successful",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (e) {
      console.info("Error Register user");
      res.status(500).json({ message: "Internal server error" });
    }
  },

  Login: async (req, res) => {
    try {
    } catch (e) {}
  },
};

export default authController;

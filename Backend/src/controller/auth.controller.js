import jwt from "json-web-token";
import User from "../model/User";

const signToken = (user) => {
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

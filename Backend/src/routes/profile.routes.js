import { Router } from "express";
import profileController from "../controller/profile.controller.js";
import { auth } from "../../middleware/auth.js";
const profileRout = Router();

profileRout.get("/api/v1/profile/me", auth, profileController.getMe);

export default profileRout;

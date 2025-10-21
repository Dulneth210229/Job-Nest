import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { permit } from "../middleware/roles.js";
import badgeController from "../controller/badge.controller.js";

const badgeRouter = Router();

badgeRouter.post(
  "/api/v1/badges/catalog",
  auth,
  permit("ADMIN"),
  badgeController.createBadgeType
);

export default badgeRouter;

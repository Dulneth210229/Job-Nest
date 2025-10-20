import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
// console.log("Stripe webhook secret set?", !!process.env.STRIPE_WEBHOOK_SECRET);

import { connectDB } from "./lib/db.js";
//*Importing all the routes
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import organizationRouter from "./routes/organization.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "*" }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.use(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  (req, _res, next) => {
    req.rawBody = req.body; // keep Buffer for signature verification
    next();
  },
  paymentRoutes
);

app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", organizationRouter);
app.use("/", jobRouter);
app.use("/", applicationRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

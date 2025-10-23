import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
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
import chatRouter from "./routes/chat.routes.js";
import badgeRouter from "./routes/badge.routes.js";

//* Realtime
import http from "http";
import { initSocket } from "./realtime/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app); // <-- http server for socket.io
initSocket(server);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "*" }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

// Serve uploads statically
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

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
app.use("/", chatRouter);
app.use("/", badgeRouter);

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

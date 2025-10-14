import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
//*Importing all the routes
import authRouter from "./routes/auth.routes.js";
import profileRout from "./routes/profile.routes.js";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRout);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

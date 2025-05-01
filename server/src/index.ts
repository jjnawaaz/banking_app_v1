import "dotenv/config";
import express from "express";
const app = express();
import { adminRouter } from "./routes/adminRoutes";
import { userRouter } from "./routes/userRoutes";
import cors from "cors";
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from banking app");
});

app.listen(PORT, () => {
  console.log("Server Started");
});

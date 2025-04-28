import "dotenv/config";
import express from "express";
const app = express();
import { adminRouter } from "./routes/adminRoutes";

app.use(express.json());

app.use("/admin", adminRouter);

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello from banking app");
});

app.listen(PORT, () => {
  console.log("Server Started");
});

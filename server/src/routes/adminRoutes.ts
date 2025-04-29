import express from "express";
import {
  AdminLogin,
  AdminSignUp,
  approveUsers,
  dummyMoney,
  getAllUsers,
} from "../controller/adminController";
import { authenticateJWT } from "../middleware/authenticateJwt";

export const adminRouter = express.Router();

adminRouter.post("/signup", AdminSignUp);
adminRouter.post("/signin", AdminLogin);
adminRouter.post("/approve", authenticateJWT, approveUsers);
adminRouter.get("/users", authenticateJWT, getAllUsers);
adminRouter.post("/addmoney", authenticateJWT, dummyMoney);

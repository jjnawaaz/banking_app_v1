import express from "express";
import {
  getTransactions,
  sendMoney,
  UserLogin,
  UserSignUp,
} from "../controller/userController";
import { authenticateJWT } from "../middleware/authenticateJwt";
export const userRouter = express.Router();

userRouter.post("/signup", UserSignUp);
userRouter.post("/login", UserLogin);
userRouter.post("/sendmoney", authenticateJWT, sendMoney);
userRouter.get("/transactions", authenticateJWT, getTransactions);

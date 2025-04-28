import express from "express";
import { UserSignUp } from "../controller/userController";
export const userRouter = express.Router();

userRouter.post("/signup", UserSignUp);

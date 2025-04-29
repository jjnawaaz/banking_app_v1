import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import { CustomRequest, JwtPayload } from "../interface/interface1";
const SECRET: Secret = process.env.JWT_SECRET!;

export const authenticateJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  if (!token) {
    res.status(403).json({
      message: "No signin token",
    });
    return;
  }
  try {
    const user = jwt.verify(token, SECRET) as JwtPayload;
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).json({
        message: "jwt error or expired",
      });
    }
  } catch (err) {
    res.status(403).json({
      error: err,
    });
  }
};

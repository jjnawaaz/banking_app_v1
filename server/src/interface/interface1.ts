import { Request } from "express";

export interface JwtPayload {
  username: string;
}

export interface CustomRequest extends Request {
  user?: JwtPayload;
  admin?: JwtPayload;
}

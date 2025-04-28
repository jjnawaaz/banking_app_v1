import { Request, Response } from "express";
import prisma from "../db/dbConnect";
import { hashPassword } from "../utils/hashUtils";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";

const SECRET: Secret = process.env.JWT_SECRET!;

export const UserSignUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(403).json({
      message: "Please enter all fields",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    res.status(403).json({
      message: "User already exists",
    });
    return;
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // store user in db
  const storeUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(email, SECRET);
  if (storeUser) {
    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
    return;
  } else {
    res.status(500).json({
      message: "Some db error",
    });
  }
};

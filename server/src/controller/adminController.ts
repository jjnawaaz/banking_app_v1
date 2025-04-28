import { Request, Response } from "express";
import prisma from "../db/dbConnect";
import { hashPassword, verifyPassword } from "../utils/hashUtils";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import { CustomRequest } from "../interface/interface1";

const SECRET: Secret = process.env.JWT_SECRET!;

export const AdminSignUp = async (req: Request, res: Response) => {
  /** Destructure username and password */
  const { name, username, password } = req.body;

  /** check the fields*/
  if (!name || !username || !password) {
    res.status(403).json({
      message: "Enter all fields",
    });
    return;
  }

  /** Hash Password */
  const hashedPassword = await hashPassword(password);

  const existingUser = await prisma.admin.findUnique({
    where: {
      email: username,
    },
  });
  /** Find user and check if he exists already */
  if (existingUser) {
    res.status(403).json({
      message: "User already exists",
    });
    return;
  }
  /** Create user and save in DB */
  const createUser = await prisma.admin.create({
    data: {
      name: name,
      email: username,
      password: hashedPassword,
    },
  });

  if (createUser) {
    res.status(201).json({
      message: "Admin is created",
      admin: createUser,
    });
    return;
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const AdminLogin = async (req: Request, res: Response) => {
  /** Destructure the Data  */
  const { username, password } = req.body;

  /** check the username and password */

  if (!username || !password) {
    res.status(403).json({
      message: "Please enter username and password",
    });
    return;
  }

  /** Verify the password*/
  const verifyPass = await verifyPassword(username, password);
  if (verifyPass) {
    /** Generate token */
    const token = jwt.sign({ username: username }, SECRET);
    res.status(201).json({
      message: "User logged in successfully",
      token: token,
    });
    return;
  }
  res.status(403).json({
    message: "Login failed check username or password again",
  });
  return;
};

// Pending functionality
export const approveUsers = async (req: CustomRequest, res: Response) => {
  // Check if the user is admin or not get it from token
  const adminUsername = req.admin?.username;
  const username = req.body;
  if (!adminUsername) {
    res.status(403).json({
      message: "Unauthorized user",
    });
  }
  const isAdmin = await prisma.admin.findMany({
    where: {
      email: adminUsername,
    },
  });
  if (isAdmin[0]) {
    // find user
    const user = await prisma.user.findMany({
      where: {
        email: username,
      },
    });

    console.log(user);
  }
  console.log(isAdmin[0].email);
};

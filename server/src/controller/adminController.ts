import { Request, Response } from "express";
import prisma from "../db/dbConnect";
import { hashPassword, verifyPasswordAdmin } from "../utils/hashUtils";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import { CustomRequest } from "../interface/interface1";

const SECRET: Secret = process.env.JWT_SECRET!;

/** Admin SignUp */
export const AdminSignUp = async (req: Request, res: Response) => {
  /** Destructure username and password */
  const { name, username, password } = req.body;
  console.log(req.body.password);

  console.log("Hitting from frontEnd");
  console.log(name, username, password);
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

/** Admin Login */
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
  const verifyPass = await verifyPasswordAdmin(username, password);
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

/** Admin approval functionality */
export const approveUsers = async (req: CustomRequest, res: Response) => {
  /** Get admin data and username data */
  const adminUsername = req.user?.username;
  const username = req.body.username;
  /** Check for correct fields */
  if (!adminUsername) {
    res.status(403).json({
      message: "Unauthorized user",
    });
    return;
  }
  /** Check for username details */
  if (!username) {
    res.status(403).json({
      message: "Please send user details",
    });
    return;
  }
  /** Find admin in admin DB */
  const isAdmin = await prisma.admin.findMany({
    where: {
      email: adminUsername,
    },
  });

  /** If admin DB then user approval logic */
  if (isAdmin) {
    try {
      /** Find user in DB and update*/
      const user = await prisma.user.update({
        where: {
          email: username,
        },
        data: {
          approved: true,
        },
      });
      res.status(201).json({
        message: "User approved successfully",
      });
      return;
    } catch (err) {
      /** Catch errors if user doesnt exists */
      res.status(403).json({
        message: "Error while approving",
        error: err,
      });
      return;
    }
  } else {
    /** If user exists in Admin DB if not he is invalid admin */
    res.status(403).json({
      message: "Invalid admin",
    });
    return;
  }
};

/** Admin can get all users */
export const getAllUsers = async (req: CustomRequest, res: Response) => {
  try {
    const adminEmail = req.user?.username;
    if (!adminEmail) {
      res.status(403).json({
        message: "Unauthorized: Admin credentials missing",
      });
      return;
    }

    const isAdmin = await prisma.admin.findFirst({
      where: {
        email: adminEmail,
      },
    });

    if (isAdmin) {
      const users = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          accNo: true,
          approved: true,
        },
      });

      res.status(200).json({
        message: "Users fetched successfully",
        users: users,
      });
    } else {
      res.status(403).json({
        message: "Forbidden: Admin privileges required",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Dummy route to update user balances

export const dummyMoney = async (req: CustomRequest, res: Response) => {
  try {
    const adminId = req.user?.username;
    const { email, addAmount } = req.body;
    if (!adminId) {
      res.status(403).json({
        message: " Invalid admin token",
      });
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        balance: { increment: Number(addAmount) },
      },
    });

    res.status(201).json({
      message: "Added dummy balance successfully",
    });
    return;
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

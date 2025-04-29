import { Request, Response } from "express";
import prisma from "../db/dbConnect";
import { hashPassword, verifyPasswordUser } from "../utils/hashUtils";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import { CustomRequest } from "../interface/interface1";

const SECRET: Secret = process.env.JWT_SECRET!;

/** User SignUp */
export const UserSignUp = async (req: Request, res: Response) => {
  /** Destructure all the fields */
  const { name, email, password } = req.body;
  /** Check if the fields are entered */
  if (!name || !email || !password) {
    res.status(403).json({
      message: "Please enter all fields",
    });
    return;
  }

  /** Find the user if he exists in DB already */
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  /** If he exists then return that user exists */
  if (user) {
    res.status(403).json({
      message: "User already exists",
    });
    return;
  }

  /** Hash the password */
  const hashedPassword = await hashPassword(password);
  /** Create user in DB */
  const storeUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  /** Send token for login */
  const token = jwt.sign(email, SECRET);
  if (storeUser) {
    res.status(201).json({
      message: "User created successfully",
      user: storeUser,
      token: token,
    });
    return;
  } else {
    /** if user isnt created DB error */
    res.status(500).json({
      message: "Some db error",
    });
  }
};

/** User login */
export const UserLogin = async (req: Request, res: Response) => {
  /** Destructure the data */
  const { email, password } = req.body;
  /** Check if the fields are entered */
  if (!email || !password) {
    res.status(403).json({
      message: "Please Enter all fields",
    });
  }

  /**verify user*/
  try {
    const passwordMatch = await verifyPasswordUser(email, password);

    if (passwordMatch === true) {
      const token = jwt.sign({ username: email }, SECRET);
      res.status(200).json({
        message: "User logged in successfully",
        token: token,
      });
      return;
    } else {
      res.status(403).json({
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    res.status(403).json({
      error: err,
    });
  }
};

/** User can send money */

export const sendMoney = async (req: CustomRequest, res: Response) => {
  /** Get sender user details */
  const user = req.user?.username;
  /** Get receiver user details */
  const { receiverEmail, receiverAccNo, amount, transactionName } = req.body;

  if (!user) {
    res.status(403).json({
      message: "Unauthorized: User credentials missing",
    });
    return;
  }

  if (!receiverEmail || !receiverAccNo || !amount) {
    res.status(403).json({
      message: "Please send all sender details",
    });
  }

  /** Check if user exists */
  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email: user,
      },
    });

    const isReceiver = await prisma.user.findFirst({
      where: {
        email: receiverEmail,
        accNo: Number(receiverAccNo),
      },
    });

    if (isUser?.approved && isReceiver?.approved) {
      try {
        await prisma.$transaction(async (prisma) => {
          /** Update sender DB */
          if (isUser.balance >= amount) {
            await prisma.user.update({
              where: {
                email: user,
              },
              data: {
                balance: { decrement: Number(amount) },
              },
            });

            /** Update receiver DB */
            await prisma.user.update({
              where: {
                email: receiverEmail,
              },
              data: {
                balance: { increment: Number(amount) },
              },
            });
            /** Generate sender Transaction */
            await prisma.transaction.create({
              data: {
                transaction_name: transactionName.toString(),
                amount: Number(amount),
                senderId: isUser.accNo,
                receiverId: isReceiver.accNo,
                userId: isUser.id,
                type: "SENT",
              },
            });
            /** Generate receiver transaction */
            await prisma.transaction.create({
              data: {
                transaction_name: transactionName.toString(),
                amount: Number(amount),
                senderId: isUser.accNo,
                receiverId: isReceiver.accNo,
                userId: isReceiver.id,
                type: "RECEIVED",
              },
            });
          } else {
            res.status(403).json({
              message: "Insufficient balance",
            });
          }
        });
        res.status(200).json({
          message: "Transaction successful",
        });
      } catch (err) {
        await prisma.$executeRaw`ROLLBACK`;
        res.status(500).json({
          message: "Transaction failed",
          error: err,
        });
      }
    } else {
      res.status(403).json({
        message: "Invalid sender or receiver",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

/** User can get their transactions */
export const getTransactions = async (req: CustomRequest, res: Response) => {
  const user = req.user?.username;
  if (!user) {
    res.status(403).json({
      message: "Invalid user credentials",
    });
  }
  const transactions = await prisma.user.findFirst({
    where: {
      email: user,
    },
    select: {
      transactions: true,
    },
  });
  if (transactions) {
    res.status(200).json({
      message: "List of all transactions",
      transactions: transactions,
    });
    return;
  }
  res.status(403).json({
    message: "Invalid user",
  });
};

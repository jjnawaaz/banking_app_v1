import bcrypt from "bcrypt";
import prisma from "../db/dbConnect";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const verifyPasswordAdmin = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const passwordDB = await prisma.admin.findMany({
      where: {
        email: email,
      },
    });

    const match = await bcrypt.compare(password, passwordDB[0].password);
    return match;
  } catch (err) {
    return err;
  }
};
export const verifyPasswordUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const passwordDB = await prisma.user.findMany({
      where: {
        email: email,
      },
    });

    const match = await bcrypt.compare(password, passwordDB[0].password);
    return match;
  } catch (err) {
    return err;
  }
};

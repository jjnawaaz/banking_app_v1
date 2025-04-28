import bcrypt from "bcrypt";
import prisma from "../db/dbConnect";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const verifyPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  const passwordDB = await prisma.admin.findMany({
    where: {
      email: email,
    },
  });

  const match = await bcrypt.compare(password, passwordDB[0].password);
  return match;
};

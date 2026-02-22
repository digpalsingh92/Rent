import { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { prisma } from "../config/Database.config"
import bcrypt from 'bcrypt';
import generateJwtToken from "../utils/helper";

export const createUser = async (req: Request, res:Response) => {
   const { fullName,email, password } = req.body;

   if (!email || !password || !fullName) {
      return res.status(400).json(successResponse("Missing required fields"));
   }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json(successResponse("Email already in use"));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   const user = await prisma.user.create({
      data: {
         email,
         password: hashedPassword,
         fullName: fullName,
         role: "user",
      }
   });
   //user object without password
   const { password: _, ...safeUser} = user;

   //generate JWT token
   const token = generateJwtToken({ id: user.id, role: user.role });

   res.status(201).json(successResponse("User registered successfully", {user:safeUser, token}));
}
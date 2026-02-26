import { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { prisma } from "../config/Database.config"
import bcrypt from 'bcrypt';
import generateJwtToken from "../utils/helper";
import { StatusCodes } from "../constants/StatusCodes";


export const createUser = async (req: Request, res:Response) => {
   const { fullName,email, password } = req.body;

   if (!email || !password || !fullName) {
      return res.status(StatusCodes.BAD_REQUEST).json(successResponse("Missing required fields"));
   }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(StatusCodes.BAD_REQUEST).json(successResponse("Email already in use"));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   const user = await prisma.user.create({
      data: {
         email,
         password: hashedPassword,
         fullName: fullName,
         systemRole: "USER",
      }
   });
   //user object without password
   const { password: _, ...safeUser} = user;

   //generate JWT token
   const token = generateJwtToken({ id: user.id, systemRole: user.systemRole, email: user.email });

   res.status(StatusCodes.CREATED).json(successResponse("User registered successfully", {user:safeUser, token}));
}

export const loginUser = async (req: Request, res:Response) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json(successResponse("Missing required fields"));
   }

   const user = await prisma.user.findUnique({ where: { email } });
   if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json(successResponse("Invalid email or password"));
   }

   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
      return res.status(StatusCodes.BAD_REQUEST).json(successResponse("Invalid email or password"));
   }

   //user object without password
   const { password: _, ...safeUser} = user;

   //generate JWT token
   const token = generateJwtToken({ id: user.id, systemRole: user.systemRole, email: user.email });

   res.status(StatusCodes.OK).json(successResponse("Login successfull", {user:safeUser, token}));
}
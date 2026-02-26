import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "../constants/StatusCodes";
import { env } from "../config/env.config";

interface JwtPayload {
  id: string;
  role: string;
}

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const decodedToken = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    if (!decodedToken.id || !decodedToken.role) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid token payload",
      });
    }

    req.user = {
      id: decodedToken.id,
      systemRole: decodedToken.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid token",
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Authentication failed",
    });
  }
};
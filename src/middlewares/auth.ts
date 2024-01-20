import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import dotenv from "dotenv";
import { IUser } from "../interfaces/user";
import { IRequest } from "../interfaces/base";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function isAdmin(req: IRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error("No authorization header");

        const token = authHeader.split(" ")[1];
        if (!token) throw new Error("No token provided");

        const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };

        const user = await UserModel.findById(decodedToken.userId, { password: 0 });
        if (user?.userType !== 'paw-admin') throw new Error("Not an admin");

        return next();
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}

export async function getUserFromToken(req:IRequest,res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) throw new Error("No token provided")

        const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string }

        const user = await UserModel.findById(decodedToken.userId, { password: 0 })
        req.userJSON = user as IUser
        return next()
    } catch (error) {
        throw new Error("Failed to get user from token")
    }
}

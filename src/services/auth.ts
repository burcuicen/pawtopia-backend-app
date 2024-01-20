import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request } from "express";

import UserModel from "../models/user";
import type { ISurveyResult, IUser } from "../interfaces/user";


const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.SECRET_KEY || "change";

class AuthService {
  public static async register({
    username,
    email,
    password,
    firstName,
    lastName,
    userType,
    surveyResults,
    country,
    city,

  }:{
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    userType: 'paw-seeker' | 'paw-guardian'| 'other'| 'paw-admin'
    surveyResults?: ISurveyResult
    country: string
    city: string
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      await UserModel.create({ username, password: hashedPassword, email, firstName, lastName, userType, surveyResults, country, city })
    } catch (error) {
      throw new Error("Failed to register user");
    }
  }

  public static async login(username: string, password: string): Promise<string> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) throw new Error("User not found");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
      return token;

    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  public static async getUserFromToken(req: Request): Promise<IUser | null> {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) throw new Error("No token provided")

      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string }

      const user = await UserModel.findById(decodedToken.userId);
      if (!user) throw new Error("No user found with the provided userId")
      
      return user;

    } catch (error) {
      throw new Error("Failed to get user from token");
    }
  }
}

export default AuthService;

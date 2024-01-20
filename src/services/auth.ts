import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user";
import type { ISurveyResult, IUser } from "../interfaces/user";
import dotenv from "dotenv";
import { IRequest } from "../interfaces/base";
dotenv.config()

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string


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
    userType: 'paw-seeker' | 'paw-guardian'| 'other' | 'paw-admin'
    surveyResults?: ISurveyResult
    country: string
    city: string
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      const _userType = userType === 'paw-admin' ? 'other' : userType
      const data = { username, password: hashedPassword, email, firstName, lastName, userType: _userType, surveyResults, country, city }
      await UserModel.create(data)
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

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
      return token;

    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  public static async getUserFromToken(req: IRequest): Promise<IUser | null> {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) throw new Error("No token provided")

      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string }

      const user = await UserModel.findById(decodedToken.userId, { password: 0 })

      if (!user) throw new Error("No user found with the provided userId")

      return user;

    } catch (error) {
      throw new Error("Failed to get user from token");
    }
  }
}

export default AuthService;

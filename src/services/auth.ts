import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user";
import type { ISurveyResult, IUser } from "../interfaces/user";
import { IRequest } from "../interfaces/base";
import { config } from "../config/environment";

const SALT_ROUNDS = 10;
const JWT_SECRET = config.JWT_SECRET;


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
      let _userType = userType === 'paw-admin' ? 'other' : userType

      const { purpose } = surveyResults || {}
       
      if (!userType) {
        if (purpose === 'looking-guardian') {
          _userType = 'paw-guardian'
        } else if (purpose === 'looking-pet') {
          _userType = 'paw-seeker'
        } else {
          _userType = 'other'
        }
      }
      
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

  public static async updateProfile(
    req: IRequest,
    updateData: {
      firstName?: string
      lastName?: string
      email?: string
      country?: string
      city?: string
      surveyResults?: ISurveyResult
    }
  ): Promise<IUser | null> {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) throw new Error("No token provided")

      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string }

      // Remove undefined values
      const cleanedData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      )

      const user = await UserModel.findByIdAndUpdate(
        decodedToken.userId,
        cleanedData,
        { new: true, select: '-password' }
      )

      if (!user) throw new Error("User not found")

      return user

    } catch (error) {
      throw new Error("Failed to update profile")
    }
  }
}

export default AuthService;

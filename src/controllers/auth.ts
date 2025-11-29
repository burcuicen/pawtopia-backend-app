import { Response } from "express";

import AuthService from "../services/auth";
import { IRequest } from "../interfaces/base";

class AuthController {
  public static async register(req: IRequest, res: Response): Promise<void> {
    try {
      const { username, password, email, firstName, lastName, userType, surveyResults, country, city } = req.body
      
      // Validation
      if (!username || !password || !email || !firstName || !lastName) {
        res.status(400).json({ message: 'Missing required fields: username, password, email, firstName, lastName' });
        return;
      }

      const user = await AuthService.register({username, password, email, firstName, lastName, userType, surveyResults, country, city})

      res.status(201).json({ message: 'User registered successfully', user });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle duplicate key error (user already exists)
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        res.status(409).json({ message: `${field} already exists` });
        return;
      }
      
      res.status(500).json({ message: error.message || 'Failed to register user' });
    }
  }

  public static async login(req: IRequest, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const token = await AuthService.login(username, password);

      res.status(200).json({ token });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public static async getUser(req: IRequest, res: Response): Promise<void> {
    try {
      const user = await AuthService.getUserFromToken(req);

      res.status(200).json(user);

    } catch (error: any) {

      res.status(500).json({ message: error.message });
    }
  }

  public static async updateProfile(req: IRequest, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, country, city, surveyResults, profilePicture } = req.body;
      
      const user = await AuthService.updateProfile(req, {
        firstName,
        lastName,
        email,
        country,
        city,
        surveyResults,
        profilePicture
      });

      res.status(200).json({ message: 'Profile updated successfully', user });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ONE-TIME USE: Create admin user
  // Removed for security
}

export default AuthController;

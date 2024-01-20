import { Request, Response } from "express";

import AuthService from "../services/auth";

class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email, firstName, lastName, userType, surveyResults, country, city } = req.body;
      const user = await AuthService.register({username, password, email, firstName, lastName, userType, surveyResults, country, city});

      res.status(201).json(user);
      
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const token = await AuthService.login(username, password);

      res.status(200).json({ token });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public static async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await AuthService.getUserFromToken(req);

      res.status(200).json(user);

    } catch (error: any) {

      res.status(500).json({ message: error.message });
    }
  }
}

export default AuthController;

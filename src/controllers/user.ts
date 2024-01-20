import { Response } from "express"
import {UserService} from "../services/user"
import { IQueryParams, IRequest } from "../interfaces/base";

export  class UserController {
    public static async getAll(req: IRequest, res: Response): Promise<void> {
        try {
            console.log(req.userJSON)
            const {skip, limit, text, sort, filter} = req.query
            const query = {
                skip,
                limit,
                text,
                sort,
                filter
            } as IQueryParams
            const users = await UserService.getAll(query);
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
      }
        public static async getById(req: IRequest, res: Response): Promise<void> {
            try {
                const user = await UserService.getById(req.params.id);
                res.status(200).json(user);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
        public static async create(req: IRequest, res: Response): Promise<void> {
            try {
                const user = await UserService.create(req.body);
                res.status(201).json(user);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
        public static async update(req: IRequest, res: Response): Promise<void> {
            try {
                const user = await UserService.update(req.params.id, req.body);
                res.status(200).json(user);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
}
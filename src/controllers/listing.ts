import { Response } from "express"
import { ListingService } from "../services/listing"
import { IQueryParams, IRequest } from "../interfaces/base";
import { IUser } from "../interfaces/user";

export class ListingController {
    public static async getAll(req: IRequest, res: Response): Promise<void> {
        try {
            const {skip, limit, text, sort, filter} = req.query
            const query = {
                skip,
                limit,
                text,
                sort,
                filter
            } as IQueryParams
            
            const user = req.userJSON as IUser;
            const isAdmin = user?.userType === 'paw-admin';
            
            const listings = await ListingService.getAll(query, isAdmin);
            res.status(200).json(listings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
      }
      public static async search(req: IRequest, res: Response): Promise<void> {
        try {
            const {skip, limit, text, sort, filter} = req.query
            const query = {
                skip,
                limit,
                text,
                sort,
                filter
            } as IQueryParams
            const listings = await ListingService.search(query);
            res.status(200).json(listings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
      }
      public static async getUsersListings(req: IRequest, res: Response): Promise<void> {
        try {
            const {skip, limit, text, sort, filter} = req.query
            const query = {
                skip,
                limit,
                text,
                sort,
                filter
            } as IQueryParams
            const user = req.userJSON as IUser
            const listings = await ListingService.getUsersListings(query, user._id);
            res.status(200).json(listings);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
      }
        public static async getById(req: IRequest, res: Response): Promise<void> {
            try {
                const listing = await ListingService.getById(req.params.id);
                res.status(200).json(listing);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
        public static async create(req: IRequest, res: Response): Promise<void> {
            try {
                const user = req.userJSON as IUser
                const listing = await ListingService.create(req.body, user);
                res.status(201).json(listing);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
        public static async update(req: IRequest, res: Response): Promise<void> {
            try {
                const listing = await ListingService.update(req.params.id, req.body);
                res.status(200).json(listing);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
        public static async delete(req: IRequest, res: Response): Promise<void> {
            try {
                const listing = await ListingService.delete(req.params.id);
                res.status(200).json(listing);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
        public static async approve(req: IRequest, res: Response): Promise<void> {
            try {
                const listing = await ListingService.approve(req.params.id);
                res.status(200).json(listing);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }

        public static async reject(req: IRequest, res: Response): Promise<void> {
            try {
                const listing = await ListingService.reject(req.params.id);
                res.status(200).json(listing);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }

        public static async seed(req: IRequest, res: Response): Promise<void> {
            try {
                let user = req.userJSON as IUser;

                if (!user) {
                    const UserModel = require('../models/user').default;
                    const AuthService = require('../services/auth').default;

                    // Try to find an admin user
                    const foundUser = await UserModel.findOne({ userType: 'paw-admin' });
                    if (foundUser) {
                        user = foundUser as IUser;
                    }

                    if (!user) {
                        // Create an admin user if none exists
                        await AuthService.register({
                            username: "admin",
                            email: "admin@pawtopia.com",
                            password: "admin",
                            firstName: "Admin",
                            lastName: "User",
                            userType: "paw-admin",
                            country: "United States",
                            city: "New York"
                        });
                        user = await UserModel.findOne({ username: "admin" }) as IUser;
                    }
                }

                if (!user) throw new Error("Could not find or create user for seeding");

                await ListingService.seed(user);
                res.status(201).json({ message: 'Database seeded successfully', user: { username: user.username } });
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }

        public static async clear(req: IRequest, res: Response): Promise<void> {
            try {
                await ListingService.clear();
                res.status(200).json({ message: 'Database cleared successfully' });
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
}

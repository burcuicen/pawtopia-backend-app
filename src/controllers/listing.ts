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
            const listings = await ListingService.getAll(query);
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
}

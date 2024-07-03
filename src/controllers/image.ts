
import { Request, Response } from 'express';

import { ImageService } from '../services/image';
import type { IUser } from '../interfaces/user';
import type { IQueryParams, IRequest } from '../interfaces/base';

export class ImageController {
    public static async upload(req: IRequest, res: Response): Promise<any> {
        try {
            const userData = req.userJSON as IUser
            const file = req.file
    
            if (!file) return res.status(400).send('No file uploaded.')
    
            const uploadedImage = await ImageService.upload(file, userData)
            res.status(201).json(uploadedImage)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
    
    public static async getById(req: IRequest, res: Response): Promise<void> {
        try {
            const listing = await ImageService.getById(req.params.id)
            res.status(200).json(listing)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
    public static async delete(req: IRequest, res: Response): Promise<void> {
        try {
            const user = req.userJSON as IUser
            const listing = await ImageService.delete(req.params.id, user)
            res.status(200).json(listing);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
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
            const listings = await ImageService.getAll(query)
            res.status(200).json(listings)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
      }
}

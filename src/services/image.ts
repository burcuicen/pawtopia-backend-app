// src/services/image.ts

import fs from 'fs'

import ImageModel from '../models/image'

import { queryBuilder } from '../utils'

import type { IUser } from '../interfaces/user'
import type { IImage } from '../interfaces/image'
import type { IPaginatedResult, IQueryParams } from '../interfaces/base'

export class ImageService {
    public static async upload(file: any, userData: IUser): Promise<IImage> {
        const { filename, path } = file
        const uploader = userData || null

        const newImage = new ImageModel({
            filename,
            path,
            uploader
        });

        return await newImage.save()
    }

    public static async delete(id: string, userData: IUser): Promise<void> {
        const image = await ImageModel.findById(id) as IImage;

        if (!image) throw new Error('Image not found.')

        if (userData.userType === 'paw-admin' && image.uploader !== userData._id) throw new Error('Unauthorized to delete this image.');

        fs.unlinkSync(image.path)
        await ImageModel.findByIdAndDelete(id)
    }
    public static async getById(id: string): Promise<IImage> {
        const image = await ImageModel.findById(id).exec() as IImage;
        if (!image) throw new Error('Image not found.')
        return image
    }

    public static async getAll(queryParams: IQueryParams): Promise<IPaginatedResult<IImage>> {
        const queryObject = queryBuilder(queryParams)

        let query = ImageModel.find(queryObject.filter)
        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)

        const items = await query.exec()
        const totalCount = await ImageModel.countDocuments(queryObject.filter)

        return {
            items,
            metaData: {
                totalCount
            }
        };
    }
}
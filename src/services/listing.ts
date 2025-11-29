///CRUD FOR USER MODEL
import bcrypt from "bcrypt";

import type { IPaginatedResult, IQueryParams, IRequest } from '../interfaces/base';

import type { IListing, IListingCreateDto } from '../interfaces/listing';

import { queryBuilder } from '../utils';

import Listing from '../models/listing';
import { IUser } from "../interfaces/user";


export class ListingService {
    public static async getAll(queryParams: IQueryParams): Promise<IPaginatedResult<IListing>> {
        const queryObject = queryBuilder(queryParams)

        let query = Listing.find(queryObject.filter)

        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)

        const items = await query.exec()
        const totalCount = await Listing.countDocuments(queryObject.filter)


        const data = {
            items,
            metaData: {
                totalCount
            }
        }

        return data
    }
    public static async search(queryParams: IQueryParams): Promise<IPaginatedResult<IListing>> {
        const queryObject = queryBuilder(queryParams)

        let query = Listing.find(queryObject.filter)

        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)
        //only return isApproved listings
        query = query.find({ isApproved: true })

        const items = await query.exec()
        const totalCount = await Listing.countDocuments(queryObject.filter)


        const data = {
            items,
            metaData: {
                totalCount
            }
        }

        return data
    }
    public static async getUsersListings(queryParams: IQueryParams, id: string): Promise<IPaginatedResult<IListing>> {
        const queryObject = queryBuilder(queryParams)

        let query = Listing.find(queryObject.filter)

        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)
        //only return listings created by user
        query = query.find({ createdBy: id })

        const items = await query.exec()
        const totalCount = await Listing.countDocuments(queryObject.filter)


        const data = {
            items,
            metaData: {
                totalCount
            }
        }

        return data
    }
    public static async getById(id: string): Promise<IListing | null> {
        return await Listing.findById(id).exec()
    }
    public static async create(data: IListingCreateDto, userData: IUser): Promise<IListing> {
        const { title, details, contactDetails } = data

        const _createdDate = Date.now()
        const _createdBy = userData

        const item = { title, details, contactDetails, createdDate: _createdDate, createdBy: _createdBy }

        return await Listing.create(item)
    }
    public static async update(id: string, data: IListingCreateDto): Promise<IListing | null> {
        const { title, details, contactDetails } = data

        const item = { title, details, contactDetails }

        return await Listing.findByIdAndUpdate(id, item, { new: true }).exec()
    }
    public static async delete(id: string): Promise<IListing | null> {
        return await Listing.findByIdAndDelete(id).exec()
    }
    public static async approve(id: string): Promise<IListing | null> {
        return await Listing.findByIdAndUpdate(id, { isApproved: true }, { new: true }).exec()
    }
    public static async reject(id: string): Promise<IListing | null> {
        return await Listing.findByIdAndUpdate(id, { isApproved: false }, { new: true }).exec()
    }
}

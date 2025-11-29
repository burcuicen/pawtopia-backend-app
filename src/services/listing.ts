///CRUD FOR USER MODEL
import bcrypt from "bcrypt";

import type { IPaginatedResult, IQueryParams, IRequest } from '../interfaces/base';

import type { IListing, IListingCreateDto } from '../interfaces/listing';

import { queryBuilder } from '../utils';

import Listing from '../models/listing';
import { IUser } from "../interfaces/user";


export class ListingService {
    public static async getAll(queryParams: IQueryParams, isAdmin: boolean = false): Promise<IPaginatedResult<IListing>> {
        const queryObject = queryBuilder(queryParams)

        // Merge admin filter logic directly into the query filter
        const finalFilter = isAdmin ? queryObject.filter : { ...queryObject.filter, isApproved: true };

        // Create query with the merged filter
        let query = Listing.find(finalFilter)

        // Apply pagination and sorting
        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)

        const items = await query.exec()
        const totalCount = await Listing.countDocuments(finalFilter)


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

        // Ensure we only search approved listings
        const finalFilter = { ...queryObject.filter, isApproved: true };

        let query = Listing.find(finalFilter)

        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)

        const items = await query.exec()
        const totalCount = await Listing.countDocuments(finalFilter)


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

        // Filter by user ID
        const finalFilter = { ...queryObject.filter, createdBy: id };

        let query = Listing.find(finalFilter)

        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)

        const items = await query.exec()
        const totalCount = await Listing.countDocuments(finalFilter)


        const data = {
            items,
            metaData: {
                totalCount
            }
        }

        return data
    }
    public static async getById(id: string): Promise<IListing | null> {
        return await Listing.findById(id).populate('createdBy').exec()
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
        // User requested to delete the listing from DB on reject
        return await Listing.findByIdAndDelete(id).exec()
    }

    public static async clear(): Promise<void> {
        await Listing.deleteMany({});
    }

    public static async seed(user: IUser): Promise<void> {
        const REAL_LISTINGS = [
            {
                title: 'Adopt Lucy',
                details: {
                    animalType: 'cat',
                    name: 'Lucy',
                    description: 'Lucy, adoptable Cat, Adult Female Domestic Short Hair, Fredericton, NB.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
                    location: { country: 'Canada', city: 'Fredericton' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0101' }
            },
            {
                title: 'Adopt LOLA & LIZZY',
                details: {
                    animalType: 'cat',
                    name: 'LOLA & LIZZY',
                    description: 'LOLA & LIZZY, adoptable Cat, Young Female Domestic Short Hair, Caribou, ME, Out-of-town pet.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800'],
                    location: { country: 'Canada', city: 'Caribou' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0102' }
            },
            {
                title: 'Adopt Amelia',
                details: {
                    animalType: 'cat',
                    name: 'Amelia',
                    description: 'Amelia, adoptable Cat, Young Female Domestic Long Hair, Fredericton, NB.',
                    breed: 'Domestic Long Hair',
                    photos: ['https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=800'],
                    location: { country: 'Canada', city: 'Fredericton' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0103' }
            },
            {
                title: 'Adopt FRITO & PRINGLE',
                details: {
                    animalType: 'cat',
                    name: 'FRITO & PRINGLE',
                    description: 'FRITO & PRINGLE, adoptable Cat, Young Male Domestic Short Hair, Caribou, ME, Out-of-town pet.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800'],
                    location: { country: 'Canada', city: 'Caribou' },
                    age: 'baby',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0104' }
            },
            {
                title: 'Adopt SUNSHINE, CLOUDY, & RAIN',
                details: {
                    animalType: 'cat',
                    name: 'SUNSHINE, CLOUDY, & RAIN',
                    description: 'SUNSHINE, CLOUDY, & RAIN, adoptable Cat, Young Female Domestic Short Hair, Caribou, ME, Out-of-town pet.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800'],
                    location: { country: 'Canada', city: 'Caribou' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0105' }
            },
            {
                title: 'Adopt Jessie',
                details: {
                    animalType: 'cat',
                    name: 'Jessie',
                    description: 'Jessie, adoptable Cat, Young Female Domestic Short Hair, Dsl De Drummond, NB.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800'],
                    location: { country: 'Canada', city: 'Dsl De Drummond' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0106' }
            },
            {
                title: 'Adopt Wordle',
                details: {
                    animalType: 'cat',
                    name: 'Wordle',
                    description: 'Wordle, adoptable Cat, Adult Male Domestic Short Hair, Florenceville, NB.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800'],
                    location: { country: 'Canada', city: 'Florenceville' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0107' }
            },
            {
                title: 'Adopt E-Girls',
                details: {
                    animalType: 'cat',
                    name: 'E-Girls, Estella and Eleanor',
                    description: 'E-Girls, Estella and Eleanor, adoptable Cat, Young Female Domestic Long Hair, Dartmouth, NS.',
                    breed: 'Domestic Long Hair',
                    photos: ['https://images.unsplash.com/photo-1573865526739-10c1d3a1b4cc?w=800'],
                    location: { country: 'Canada', city: 'Dartmouth' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0108' }
            },
            {
                title: 'Adopt FUNYUN & SCRAT',
                details: {
                    animalType: 'cat',
                    name: 'FUNYUN & SCRAT',
                    description: 'FUNYUN & SCRAT, adoptable Cat, Young Male Domestic Short Hair, Caribou, ME, Out-of-town pet.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800'],
                    location: { country: 'Canada', city: 'Caribou' },
                    age: 'baby',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0109' }
            }
        ];

        for (const listing of REAL_LISTINGS) {
            await Listing.create({
                ...listing,
                createdDate: Date.now(),
                createdBy: user._id
            });
        }
    }
}

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
                    photos: ['https://dbw3zep4prcju.cloudfront.net/animal/eab43f95-5019-4906-bbde-33979ac8beba/image/5c8a1bd0-cbb2-4656-be24-919f55db4041.jpg?versionId=vL2Fysvk3B9v1HLHGwlF._.n1T4XFtEs&bust=1763035549&width=300'],
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
                    photos: ['https://dbw3zep4prcju.cloudfront.net/animal/6e8b5006-d2d8-417f-acf5-01d215322548/image/f4869c77-8401-4714-8b9d-baaf78e3b416.jpeg?versionId=36dsg3eoH5cMilyT_yOzYWCkBLhmeiRG&bust=1762654735&width=300'],
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
                    photos: ['https://dbw3zep4prcju.cloudfront.net/animal/63a9fcef-124d-48f8-a781-211cd827a3cf/image/0e700d01-9791-422e-ae13-d558a6fc92a2.jpg?versionId=BaOQrcaZwlaFFh223HENZqN6Ig5qOOEY&bust=1763341034&width=300'],
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
                    photos: ['https://dbw3zep4prcju.cloudfront.net/animal/d7d3b2e1-bdef-4b3a-b8e8-726cb5f74a07/image/d65c85b0-224b-4a64-9579-dcd58aaad988.jpeg?versionId=82PIoMthPYrOlmJt27OZw78lOm828LHF&bust=1762644330&width=300'],
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
                    photos: ['https://dbw3zep4prcju.cloudfront.net/animal/27003c51-324e-43b0-88e6-91f9d94cf491/image/7271071b-3dfa-424f-9a63-4b78f08730ad.jpg?versionId=NMQ4Pjou70qayieLQDk8j3Bp11zsQWo9&bust=1757374071&width=300'],
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
                    photos: ['https://dbw3zep4prcju.cloudfront.net/animal/d38f5680-a46e-41de-9d3a-3d2b5c8533b0/image/4b159958-12c4-49fe-ae0f-7a3bee13df51.jpg?versionId=P47uayM871Cdl8xbZDyqIlIq99uomY2x&bust=1763574598&width=300'],
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
                    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'], // Placeholder as original was empty
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
                    photos: ['https://images.unsplash.com/photo-1573865526739-10c1d3a1b4cc?w=800'], // Placeholder
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
                    photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800'], // Placeholder
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

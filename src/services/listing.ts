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
            // DOGS
            {
                title: 'Adopt Buddy',
                details: {
                    animalType: 'dog',
                    name: 'Buddy',
                    description: 'Buddy is a playful Golden Retriever who loves fetch and swimming. Great with kids!',
                    breed: 'Golden Retriever',
                    photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800'],
                    location: { country: 'USA', city: 'San Francisco' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0201' }
            },
            {
                title: 'Adopt Bella',
                details: {
                    animalType: 'dog',
                    name: 'Bella',
                    description: 'Bella is a sweet Labrador mix. She is a bit shy at first but very loving once she knows you.',
                    breed: 'Labrador Retriever',
                    photos: ['https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=800'],
                    location: { country: 'USA', city: 'Austin' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: false, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0202' }
            },
            {
                title: 'Adopt Max',
                details: {
                    animalType: 'dog',
                    name: 'Max',
                    description: 'Max is an energetic German Shepherd. Needs an active owner who can take him on long runs.',
                    breed: 'German Shepherd',
                    photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800'],
                    location: { country: 'Germany', city: 'Berlin' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0203' }
            },
            {
                title: 'Adopt Daisy',
                details: {
                    animalType: 'dog',
                    name: 'Daisy',
                    description: 'Daisy is a gentle Beagle. Loves to sniff around and is very food motivated.',
                    breed: 'Beagle',
                    photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800'],
                    location: { country: 'UK', city: 'London' },
                    age: 'senior',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0204' }
            },
            {
                title: 'Adopt Charlie',
                details: {
                    animalType: 'dog',
                    name: 'Charlie',
                    description: 'Charlie is a goofy French Bulldog. He snores a bit but is full of personality.',
                    breed: 'French Bulldog',
                    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
                    location: { country: 'France', city: 'Paris' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0205' }
            },
            {
                title: 'Adopt Luna',
                details: {
                    animalType: 'dog',
                    name: 'Luna',
                    description: 'Luna is a beautiful Husky. Very vocal and loves cold weather.',
                    breed: 'Siberian Husky',
                    photos: ['https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800'],
                    location: { country: 'Canada', city: 'Toronto' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: false, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0206' }
            },
            {
                title: 'Adopt Cooper',
                details: {
                    animalType: 'dog',
                    name: 'Cooper',
                    description: 'Cooper is a loyal Rottweiler. Great guard dog but a big softie at heart.',
                    breed: 'Rottweiler',
                    photos: ['https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=800'],
                    location: { country: 'Germany', city: 'Munich' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0207' }
            },
            {
                title: 'Adopt Bailey',
                details: {
                    animalType: 'dog',
                    name: 'Bailey',
                    description: 'Bailey is a fluffy Samoyed. Requires lots of grooming but worth it for the cuddles.',
                    breed: 'Samoyed',
                    photos: ['https://images.unsplash.com/photo-1529429612779-c8e40df2f5ce?w=800'],
                    location: { country: 'Russia', city: 'Moscow' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0208' }
            },
            {
                title: 'Adopt Rocky',
                details: {
                    animalType: 'dog',
                    name: 'Rocky',
                    description: 'Rocky is a tough-looking Boxer with a heart of gold. Loves to play tug-of-war.',
                    breed: 'Boxer',
                    photos: ['https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?w=800'],
                    location: { country: 'USA', city: 'Chicago' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0209' }
            },
            {
                title: 'Adopt Sadie',
                details: {
                    animalType: 'dog',
                    name: 'Sadie',
                    description: 'Sadie is a smart Border Collie. Needs mental stimulation and agility training.',
                    breed: 'Border Collie',
                    photos: ['https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800'],
                    location: { country: 'UK', city: 'Edinburgh' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0210' }
            },
            {
                title: 'Adopt Bear',
                details: {
                    animalType: 'dog',
                    name: 'Bear',
                    description: 'Bear is a massive Newfoundland. A gentle giant who loves water.',
                    breed: 'Newfoundland',
                    photos: ['https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800'],
                    location: { country: 'Canada', city: 'St. John\'s' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0211' }
            },
            {
                title: 'Adopt Coco',
                details: {
                    animalType: 'dog',
                    name: 'Coco',
                    description: 'Coco is a tiny Chihuahua. Perfect lap dog for apartment living.',
                    breed: 'Chihuahua',
                    photos: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800'],
                    location: { country: 'Mexico', city: 'Mexico City' },
                    age: 'senior',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0212' }
            },
            {
                title: 'Adopt Duke',
                details: {
                    animalType: 'dog',
                    name: 'Duke',
                    description: 'Duke is a noble Great Dane. Needs plenty of space to stretch out.',
                    breed: 'Great Dane',
                    photos: ['https://images.unsplash.com/photo-1553882951-9c3dab4a50cb?w=800'],
                    location: { country: 'Germany', city: 'Hamburg' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0213' }
            },
            {
                title: 'Adopt Molly',
                details: {
                    animalType: 'dog',
                    name: 'Molly',
                    description: 'Molly is a curly-haired Poodle. Hypoallergenic and very intelligent.',
                    breed: 'Poodle',
                    photos: ['https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800'],
                    location: { country: 'France', city: 'Lyon' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0214' }
            },
            {
                title: 'Adopt Tucker',
                details: {
                    animalType: 'dog',
                    name: 'Tucker',
                    description: 'Tucker is a friendly Australian Shepherd. Loves herding and frisbee.',
                    breed: 'Australian Shepherd',
                    photos: ['https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800'],
                    location: { country: 'Australia', city: 'Sydney' },
                    age: 'baby',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0215' }
            },

            // CATS
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
                title: 'Adopt SUNSHINE',
                details: {
                    animalType: 'cat',
                    name: 'SUNSHINE',
                    description: 'SUNSHINE, adoptable Cat, Young Female Domestic Short Hair, Caribou, ME, Out-of-town pet.',
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
                title: 'Adopt Estella',
                details: {
                    animalType: 'cat',
                    name: 'Estella',
                    description: 'Estella, adoptable Cat, Young Female Domestic Long Hair, Dartmouth, NS.',
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
                title: 'Adopt FUNYUN',
                details: {
                    animalType: 'cat',
                    name: 'FUNYUN',
                    description: 'FUNYUN, adoptable Cat, Young Male Domestic Short Hair, Caribou, ME, Out-of-town pet.',
                    breed: 'Domestic Short Hair',
                    photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800'],
                    location: { country: 'Canada', city: 'Caribou' },
                    age: 'baby',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@petfinder.mock', phone: '555-0109' }
            },
            {
                title: 'Adopt Oliver',
                details: {
                    animalType: 'cat',
                    name: 'Oliver',
                    description: 'Oliver is a curious tabby cat who loves to explore.',
                    breed: 'Tabby',
                    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
                    location: { country: 'USA', city: 'New York' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0110' }
            },
            {
                title: 'Adopt Leo',
                details: {
                    animalType: 'cat',
                    name: 'Leo',
                    description: 'Leo is a majestic Maine Coon. He loves to be brushed and is very vocal.',
                    breed: 'Maine Coon',
                    photos: ['https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800'],
                    location: { country: 'USA', city: 'Boston' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0111' }
            },
            {
                title: 'Adopt Milo',
                details: {
                    animalType: 'cat',
                    name: 'Milo',
                    description: 'Milo is a playful ginger cat. He loves chasing laser pointers.',
                    breed: 'American Shorthair',
                    photos: ['https://images.unsplash.com/photo-1573865526739-10c1d3a1b4cc?w=800'],
                    location: { country: 'UK', city: 'Manchester' },
                    age: 'baby',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0112' }
            },
            {
                title: 'Adopt Chloe',
                details: {
                    animalType: 'cat',
                    name: 'Chloe',
                    description: 'Chloe is a sophisticated Siamese. She prefers a quiet home.',
                    breed: 'Siamese',
                    photos: ['https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800'],
                    location: { country: 'France', city: 'Paris' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0113' }
            },
            {
                title: 'Adopt Lily',
                details: {
                    animalType: 'cat',
                    name: 'Lily',
                    description: 'Lily is a sweet Ragdoll. She goes limp when you pick her up.',
                    breed: 'Ragdoll',
                    photos: ['https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=800'],
                    location: { country: 'Canada', city: 'Vancouver' },
                    age: 'senior',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0114' }
            },
            {
                title: 'Adopt Simba',
                details: {
                    animalType: 'cat',
                    name: 'Simba',
                    description: 'Simba is a brave Bengal. He loves to climb and needs lots of vertical space.',
                    breed: 'Bengal',
                    photos: ['https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800'],
                    location: { country: 'Germany', city: 'Berlin' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0115' }
            },
            {
                title: 'Adopt Nala',
                details: {
                    animalType: 'cat',
                    name: 'Nala',
                    description: 'Nala is a gentle Persian. Requires daily grooming.',
                    breed: 'Persian',
                    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
                    location: { country: 'Italy', city: 'Rome' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0116' }
            },
            {
                title: 'Adopt George',
                details: {
                    animalType: 'cat',
                    name: 'George',
                    description: 'George is a lazy British Shorthair. Loves to nap in sunbeams.',
                    breed: 'British Shorthair',
                    photos: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800'],
                    location: { country: 'UK', city: 'London' },
                    age: 'senior',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0117' }
            },
            {
                title: 'Adopt Sophie',
                details: {
                    animalType: 'cat',
                    name: 'Sophie',
                    description: 'Sophie is a mysterious Sphynx. Needs sweaters in winter!',
                    breed: 'Sphynx',
                    photos: ['https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800'],
                    location: { country: 'Canada', city: 'Montreal' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0118' }
            },
            {
                title: 'Adopt Jasper',
                details: {
                    animalType: 'cat',
                    name: 'Jasper',
                    description: 'Jasper is a wild-looking Savannah cat. High energy!',
                    breed: 'Savannah',
                    photos: ['https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800'],
                    location: { country: 'USA', city: 'Miami' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0119' }
            },
            {
                title: 'Adopt Willow',
                details: {
                    animalType: 'cat',
                    name: 'Willow',
                    description: 'Willow is a fluffy Norwegian Forest Cat. Loves climbing trees.',
                    breed: 'Norwegian Forest Cat',
                    photos: ['https://images.unsplash.com/photo-1573865526739-10c1d3a1b4cc?w=800'],
                    location: { country: 'Norway', city: 'Oslo' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0120' }
            },
            {
                title: 'Adopt Max',
                details: {
                    animalType: 'dog',
                    name: 'Max',
                    description: 'Max is a friendly Golden Retriever looking for a forever home.',
                    breed: 'Golden Retriever',
                    photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800'],
                    location: { country: 'USA', city: 'San Francisco' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0201' }
            },
            {
                title: 'Adopt Bella',
                details: {
                    animalType: 'dog',
                    name: 'Bella',
                    description: 'Bella is a sweet Labrador puppy full of energy.',
                    breed: 'Labrador Retriever',
                    photos: ['https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=800'],
                    location: { country: 'USA', city: 'Austin' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: false, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0202' }
            },
            {
                title: 'Adopt Charlie',
                details: {
                    animalType: 'dog',
                    name: 'Charlie',
                    description: 'Charlie is a loyal German Shepherd mix.',
                    breed: 'German Shepherd',
                    photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800'],
                    location: { country: 'Germany', city: 'Berlin' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0203' }
            },
            {
                title: 'Adopt Lucy',
                details: {
                    animalType: 'dog',
                    name: 'Lucy',
                    description: 'Lucy is a playful Beagle who loves to sniff around.',
                    breed: 'Beagle',
                    photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800'],
                    location: { country: 'UK', city: 'London' },
                    age: 'senior',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0204' }
            },
            {
                title: 'Adopt Cooper',
                details: {
                    animalType: 'dog',
                    name: 'Cooper',
                    description: 'Cooper is a sturdy Bulldog with a big heart.',
                    breed: 'Bulldog',
                    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
                    location: { country: 'France', city: 'Paris' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0205' }
            },
            {
                title: 'Adopt Daisy',
                details: {
                    animalType: 'dog',
                    name: 'Daisy',
                    description: 'Daisy is a fluffy Poodle mix.',
                    breed: 'Poodle',
                    photos: ['https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800'],
                    location: { country: 'Canada', city: 'Toronto' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: false, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0206' }
            },
            {
                title: 'Adopt Rocky',
                details: {
                    animalType: 'dog',
                    name: 'Rocky',
                    description: 'Rocky is a strong Rottweiler who is very protective.',
                    breed: 'Rottweiler',
                    photos: ['https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=800'],
                    location: { country: 'Germany', city: 'Munich' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0207' }
            },
            {
                title: 'Adopt Luna',
                details: {
                    animalType: 'dog',
                    name: 'Luna',
                    description: 'Luna is a beautiful Husky with blue eyes.',
                    breed: 'Siberian Husky',
                    photos: ['https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800'],
                    location: { country: 'Russia', city: 'Moscow' },
                    age: 'adult',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0208' }
            },
            {
                title: 'Adopt Bear',
                details: {
                    animalType: 'dog',
                    name: 'Bear',
                    description: 'Bear is a gentle giant Newfoundland.',
                    breed: 'Newfoundland',
                    photos: ['https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800'],
                    location: { country: 'Canada', city: 'St. John\'s' },
                    age: 'adult',
                    gender: 'male',
                    healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0209' }
            },
            {
                title: 'Adopt Zoe',
                details: {
                    animalType: 'dog',
                    name: 'Zoe',
                    description: 'Zoe is a smart Border Collie who loves agility.',
                    breed: 'Border Collie',
                    photos: ['https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800'],
                    location: { country: 'UK', city: 'Edinburgh' },
                    age: 'baby',
                    gender: 'female',
                    healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                    fromWhere: 'shelter'
                },
                contactDetails: { email: 'adopt@shelter.mock', phone: '555-0210' }
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

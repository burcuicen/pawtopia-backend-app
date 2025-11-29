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

    public static async seed(user: IUser): Promise<void> {
        const MOCK_LISTINGS = [
            {
              title: 'Playful Golden Retriever Puppy',
              details: {
                animalType: 'dog',
                name: 'Buddy',
                description: 'Buddy is a 3-month-old Golden Retriever who loves to play fetch and cuddle. He is very friendly with kids and other dogs.',
                breed: 'Golden Retriever',
                photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Istanbul' },
                age: 'baby',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: false, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5551234567' }
            },
            {
              title: 'Calm Persian Cat',
              details: {
                animalType: 'cat',
                name: 'Luna',
                description: 'Luna is a beautiful Persian cat looking for a quiet home. She enjoys napping in sunny spots.',
                breed: 'Persian',
                photos: ['https://images.unsplash.com/photo-1617034238698-b8699b828130?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Ankara' },
                age: 'adult',
                gender: 'female',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5559876543' }
            },
            {
              title: 'Energetic Husky Mix',
              details: {
                animalType: 'dog',
                name: 'Max',
                description: 'Max is full of energy and needs an active family. He loves running and hiking.',
                breed: 'Husky Mix',
                photos: ['https://images.unsplash.com/photo-1605568427561-40dd23d2acca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Izmir' },
                age: 'adult',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'shelter'
              },
              contactDetails: { email: 'mock@example.com', phone: '5551112233' }
            },
            {
              title: 'Sweet Tabby Kitten',
              details: {
                animalType: 'cat',
                name: 'Milo',
                description: 'Milo is a curious little kitten who loves to explore. He is litter trained and very affectionate.',
                breed: 'Tabby',
                photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Bursa' },
                age: 'baby',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: false, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'stray'
              },
              contactDetails: { email: 'mock@example.com', phone: '5554445566' }
            },
            {
              title: 'Loyal German Shepherd',
              details: {
                animalType: 'dog',
                name: 'Rex',
                description: 'Rex is a loyal and protective companion. He is well-trained and good with commands.',
                breed: 'German Shepherd',
                photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Antalya' },
                age: 'adult',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5557778899' }
            },
            {
              title: 'Fluffy Angora Rabbit',
              details: {
                animalType: 'other',
                name: 'Snowball',
                description: 'Snowball is a fluffy Angora rabbit. He needs regular grooming and a spacious cage.',
                breed: 'Angora',
                photos: ['https://images.unsplash.com/photo-1585110396067-c1d6d27b0a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Istanbul' },
                age: 'adult',
                gender: 'male',
                healthDetails: { isVaccinated: false, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5550001122' }
            },
            {
              title: 'Rescue Beagle',
              details: {
                animalType: 'dog',
                name: 'Bella',
                description: 'Bella is a sweet Beagle rescued from a shelter. She is a bit shy but warms up quickly.',
                breed: 'Beagle',
                photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Ankara' },
                age: 'senior',
                gender: 'female',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'shelter'
              },
              contactDetails: { email: 'mock@example.com', phone: '5553334455' }
            },
            {
              title: 'Playful Siamese Cat',
              details: {
                animalType: 'cat',
                name: 'Simba',
                description: 'Simba is a vocal and active Siamese cat. He loves attention and playing with toys.',
                breed: 'Siamese',
                photos: ['https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Izmir' },
                age: 'baby',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5556667788' }
            },
            {
              title: 'Cuddly French Bulldog',
              details: {
                animalType: 'dog',
                name: 'Coco',
                description: 'Coco is a cuddly French Bulldog who loves to sleep on laps. Great apartment dog.',
                breed: 'French Bulldog',
                photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Istanbul' },
                age: 'adult',
                gender: 'female',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5559990011' }
            },
            {
              title: 'Charming Cockatiel',
              details: {
                animalType: 'other',
                name: 'Sunny',
                description: 'Sunny is a cheerful Cockatiel who can whistle a few tunes. Very social bird.',
                breed: 'Cockatiel',
                photos: ['https://images.unsplash.com/photo-1615087240969-eeff2fa558f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Bursa' },
                age: 'baby',
                gender: 'male',
                healthDetails: { isVaccinated: false, isNeutered: false, isDewormed: false, isHouseTrained: false, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5552223344' }
            },
            {
              title: 'Gentle Labrador',
              details: {
                animalType: 'dog',
                name: 'Daisy',
                description: 'Daisy is a gentle giant. She loves swimming and is great with children.',
                breed: 'Labrador Retriever',
                photos: ['https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Antalya' },
                age: 'adult',
                gender: 'female',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5555556677' }
            },
            {
              title: 'Mysterious Black Cat',
              details: {
                animalType: 'cat',
                name: 'Shadow',
                description: 'Shadow is a sleek black cat with green eyes. He is independent but affectionate on his terms.',
                breed: 'Domestic Shorthair',
                photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Istanbul' },
                age: 'adult',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'stray'
              },
              contactDetails: { email: 'mock@example.com', phone: '5558889900' }
            },
            {
              title: 'Tiny Chihuahua',
              details: {
                animalType: 'dog',
                name: 'Peanut',
                description: 'Peanut is a tiny Chihuahua with a big personality. He loves to be carried around.',
                breed: 'Chihuahua',
                photos: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Ankara' },
                age: 'senior',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'owner'
              },
              contactDetails: { email: 'mock@example.com', phone: '5551239876' }
            },
            {
              title: 'Friendly Hamster',
              details: {
                animalType: 'other',
                name: 'Nibbles',
                description: 'Nibbles is a friendly Syrian hamster. He is active at night and loves his wheel.',
                breed: 'Syrian Hamster',
                photos: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Izmir' },
                age: 'baby',
                gender: 'male',
                healthDetails: { isVaccinated: false, isNeutered: false, isDewormed: false, isHouseTrained: false, hasSpecialNeeds: false },
                fromWhere: 'other'
              },
              contactDetails: { email: 'mock@example.com', phone: '5554567890' }
            },
            {
              title: 'Elegant Greyhound',
              details: {
                animalType: 'dog',
                name: 'Flash',
                description: 'Flash is a retired racing Greyhound looking for a couch to crash on. Very lazy indoors.',
                breed: 'Greyhound',
                photos: ['https://images.unsplash.com/photo-1553882951-9c3dab4a50cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                location: { country: 'Turkey', city: 'Istanbul' },
                age: 'adult',
                gender: 'male',
                healthDetails: { isVaccinated: true, isNeutered: true, isDewormed: true, isHouseTrained: true, hasSpecialNeeds: false },
                fromWhere: 'shelter'
              },
              contactDetails: { email: 'mock@example.com', phone: '5557890123' }
            }
          ];

        for (const listing of MOCK_LISTINGS) {
            await Listing.create({
                ...listing,
                createdDate: Date.now(),
                createdBy: user._id
            });
        }
    }
}

import type { Document } from "mongoose";

import type { IUser } from "./user";

export interface IListing extends Document {
    title: string
    createdDate: number
    createdBy: IUser
    details: {
        animalType: 'cat' | 'dog' | 'other'
        name: string
        description?: string
        breed?: string
        photos?: string[]
        location: {
            country: string
            city: string
        }
        age: 'baby' | 'adult' | 'senior'
        gender: 'female' | 'male'
        healthDetails?: {
            isVaccinated?: boolean
            isNeutered?: boolean
            isDewormed?: boolean
            isHouseTrained?: boolean
            hasSpecialNeeds?: boolean
        }
        fromWhere: 'shelter' | 'foster' | 'owner' | 'stray' | 'other'
    }
    contactDetails: {
        email?: string
        phone?: string
    }
    isApproved: boolean
}
export interface IListingCreateDto {
    title: string
    details: {
        animalType: 'cat' | 'dog' | 'other'
        name: string
        description?: string
        breed?: string
        photos?: string[]
        location: {
            country: string
            city: string
        }
        age: 'baby' | 'adult' | 'senior'
        gender: 'female' | 'male'
        healthDetails?: {
            isVaccinated?: boolean
            isNeutered?: boolean
            isDewormed?: boolean
            isHouseTrained?: boolean
            hasSpecialNeeds?: boolean
        }
        fromWhere: 'shelter' | 'foster' | 'owner' | 'stray' | 'other'
    }
    contactDetails: {
        email?: string
        phone?: string
    }
}
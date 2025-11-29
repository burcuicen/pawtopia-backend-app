import type { Document } from "mongoose";

interface ISurveyResult {
    purpose?: 'looking-pet' | 'looking-guardian' | 'other'
    animalPreference?: 'cat'| 'dog'| 'other'| 'just-looking'
    ageRange?: 'baby' | 'adult' | 'senior' | 'doesnt-matter'
    genderPreference?: 'male' | 'female' | 'doesnt-matter'
    healthStatus?: 'healthy' | 'special-needs' | 'doesnt-matter'
    animalCareHistory?: boolean
}
interface IUser extends Document {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    userType: 'paw-seeker' | 'paw-guardian'| 'other'| 'paw-admin'
    surveyResults?: ISurveyResult
    country: string
    city: string
    profilePicture?: string
    favorites?: string[]
}
interface IUserCreateDto {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    userType: 'paw-seeker' | 'paw-guardian'| 'other'| 'paw-admin'
    surveyResults?: ISurveyResult
    country: string
    city: string
}
export type { IUser, IUserCreateDto, ISurveyResult };

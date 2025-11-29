
import mongoose, { Schema, Document } from "mongoose";

import type { IUser } from "../interfaces/user";

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, enum: ['paw-seeker', 'paw-guardian', 'other', 'paw-admin'] },
    surveyResults: {
        purpose: { type: String, enum: ['looking-pet', 'looking-guardian', 'other'] },
        animalPreference: { type: String, enum: ['cat', 'dog', 'other', 'just-looking'] },
        ageRange: { type: String, enum: ['baby', 'adult', 'senior', 'doesnt-matter'] },
        genderPreference: { type: String, enum: ['male', 'female', 'doesnt-matter'] },
        healthStatus: { type: String, enum: ['healthy', 'special-needs', 'doesnt-matter'] },
        animalCareHistory: { type: Boolean },
    },
    country: { type: String, required: true },
    city: { type: String },
    profilePicture: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
});

export default mongoose.model<IUser>("User", UserSchema);

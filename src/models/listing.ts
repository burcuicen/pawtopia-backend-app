import mongoose, { Schema, Document } from "mongoose"
import type { IListing } from "../interfaces/listing"

const listingSchema = new Schema({
    title: { type: String, required: true },
    createdDate: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    details: {
        animalType: { type: String, enum: ['cat', 'dog', 'other'] },
        name: { type: String, required: true },
        description: { type: String },
        breed: { type: String },
        photos: [{ type: String }],
        location: {
            country: { type: String, required: true },
            city: { type: String, required: true }
        },
        age: { type: String, enum: ['baby', 'adult', 'senior'] },
        gender: { type: String, enum: ['female', 'male'] },
        healthDetails: {
            isVaccinated: { type: Boolean },
            isNeutered: { type: Boolean },
            isDewormed: { type: Boolean },
            isHouseTrained: { type: Boolean },
            hasSpecialNeeds: { type: Boolean }
        },
        fromWhere: { type: String, enum: ['shelter', 'foster', 'owner', 'stray', 'other'], required: true }
    },
    contactDetails: {
        email: { type: String },
        phone: { type: String }
    },
    isApproved: { type: Boolean, default: false }
})

// Add text index for search
listingSchema.index({ 
    title: 'text', 
    'details.name': 'text', 
    'details.breed': 'text', 
    'details.description': 'text' 
});

const ListingModel = mongoose.model<IListing>("Listing", listingSchema);

export default ListingModel;

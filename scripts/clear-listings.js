const mongoose = require('mongoose');
require('dotenv').config();

// Define schema inline to avoid import issues
const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdDate: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
});

const Listing = mongoose.model('Listing', listingSchema);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://burcuicen:burcuicen@cluster0.p4c0v.mongodb.net/pawtopia?retryWrites=true&w=majority';

async function clearListings() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('🗑️ Clearing all listings...');
        const result = await Listing.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} listings.`);

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error clearing listings:', error);
        process.exit(1);
    }
}

clearListings();

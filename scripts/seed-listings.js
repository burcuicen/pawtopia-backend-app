const fetch = require('node-fetch'); // Try node-fetch if available, or use native fetch in newer node
// If node-fetch is not installed, we might need to install it or use http
// Let's assume we can use native fetch if node is recent, or require 'http'
// To be safe, let's use standard http/https or check if fetch is available.
// Actually, let's use a simple implementation with http to avoid dependency issues if possible, 
// OR just use the existing 'fetch' dependency if it works. 
// Given the environment, let's try to use the 'fetch' package or native fetch.

// Helper for making requests
async function request(url, method, body, token) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return response.json();
}

const API_URL = 'http://localhost:8080';

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

async function seed() {
  console.log('🌱 Starting seed process...');

  // 1. Register/Login Mock User
  const mockUser = {
    username: 'mockuser',
    password: 'MockPassword123!',
    email: 'mock@example.com',
    firstName: 'Mock',
    lastName: 'User',
    userType: 'paw-guardian',
    country: 'Turkey',
    city: 'Istanbul',
    surveyResults: {
      purpose: 'looking-guardian',
      animalPreference: 'dog',
      ageRange: 'adult',
      genderPreference: 'doesnt-matter',
      healthStatus: 'healthy',
      animalCareHistory: true
    }
  };

  let token;

  console.log('🔑 Authenticating mock user...');
  try {
    // Try to register
    let res = await request(`${API_URL}/auth/register`, 'POST', mockUser);
    
    if (res.message && res.message.includes('already exists')) {
      console.log('User already exists, logging in...');
      // Login if exists
      res = await request(`${API_URL}/auth/login`, 'POST', {
        username: mockUser.username,
        password: mockUser.password
      });
    }

    if (res.token) {
      token = res.token;
      console.log('✅ Authentication successful!');
    } else if (res.user || (res.message && res.message.includes('User registered successfully'))) {
       // If registered successfully, we need to login to get token
       console.log('User registered, logging in...');
       const loginRes = await request(`${API_URL}/auth/login`, 'POST', {
        username: mockUser.username,
        password: mockUser.password
      });
      token = loginRes.token;
      if (token) {
        console.log('✅ Authentication successful!');
      } else {
        throw new Error('Login failed after registration: ' + JSON.stringify(loginRes));
      }
    } else {
      throw new Error('Failed to authenticate: ' + JSON.stringify(res));
    }

  } catch (error) {
    console.error('❌ Authentication failed:', error);
    return;
  }

  // 2. Create Listings
  console.log(`📦 Creating ${MOCK_LISTINGS.length} listings...`);
  
  let createdCount = 0;
  for (const listing of MOCK_LISTINGS) {
    try {
      const res = await request(`${API_URL}/listing`, 'POST', listing, token);
      if (res && res._id) { // Assuming response returns the created object with _id
         console.log(`✅ Created: ${listing.title}`);
         createdCount++;
      } else if (res && res.message === 'The created listing.') { // Swagger doc says this description, but actual response might be different. 
          // Let's assume success if no error
          console.log(`✅ Created: ${listing.title}`);
          createdCount++;
      } else {
         // Check if it's just the object returned
         if (res.title === listing.title) {
            console.log(`✅ Created: ${listing.title}`);
            createdCount++;
         } else {
            console.error(`❌ Failed to create ${listing.title}:`, res);
         }
      }
    } catch (error) {
      console.error(`❌ Error creating ${listing.title}:`, error);
    }
  }

  console.log(`✨ Seed completed! Created ${createdCount} listings.`);
}

seed();

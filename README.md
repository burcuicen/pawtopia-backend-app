# Pawtopia Backend Application

## Project Purpose
Pawtopia is a compassionate web platform dedicated to the adoption of street cats. It is designed to facilitate the creation and management of adoption listings for street cats, offering a user-friendly interface for both PawSeekers looking to adopt and PawGuardians looking to find a home for street cats. The platform emphasizes animal love and welfare, providing educational content and resources on pet care, and offers various features to ensure a smooth and effective adoption process.
## Installation and Running the Application
The Pawtopia backend application is developed using Node.js and Express for server-side functionality, with MongoDB as the database for efficient data management and storage.
Follow these steps to set up and run the application:
1. **Clone the project**: 
   ```
   git clone https://github.com/burcuicen/pawtopia-backend-app.git
   ```
2. **Install dependencies**: 
   ```
   npm install
   ```
3. **Build the application**: 
   ```
   npm run build
   ```
4. **Run the application in development mode**: 
   ```
   npm run dev
   ```
5. **Access the application**: 
   Open your browser and navigate to [http://localhost:8080](http://localhost:8080).

6. **Swagger Documentation**: 
   To view the API documentation, visit [http://localhost:8080/api-docs](http://localhost:8080/api-docs).
## Application Functions
- **User Registration and Login System**: Supports user registration and login for PawSeekers and PawGuardians, including profile management.
- **Listing Management**: Allows PawGuardians to create and manage adoption listings with comprehensive details.
- **Admin Management (PawAdmins)**: Involves reviewing and approving listings, moderating content, and ensuring compliance with site rules.
- **Search and Filtering Functions**: Enables PawSeekers to filter listings based on criteria like location, age, and health status.
- **Listing Detail Pages**: Provides detailed pages for each listing, including photos, health information, and contact details.

## User Types and Roles
- **PawSeeker**: Users browsing adoption listings and initiating the adoption process.
- **PawGuardian**: Users creating and managing cat adoption listings.
- **PawAdmin**: Administrators ensuring the smooth operation of the platform, including listing approval and user management.

## User Registration Flow
- Basic Information Entry: Username, email, password, first name, and last name.
- Profile Settings and Preferences: Survey format for determining user type and preferences.
- Customized Interface and Content: Based on user type and preferences.

## User Model
- Fields include basic information, survey results, preference specifications, and location.

## Backend Modules
- **Auth Module**: User registration and login functionalities.
- **User Module**: Creation, listing, updating, and deletion of users; profile and password changes.
- **Listing Module**: Creation, updating, viewing, and deletion of listings; listing approval by PawAdmins.
- **Image Module**: Uploading, viewing, and deletion of images.

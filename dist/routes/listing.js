"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var listing_1 = require("../controllers/listing");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
/**
 * @swagger
 * /listing/:
 *   get:
 *     summary: Retrieves a list of listings
 *     description: This endpoint retrieves all listings, optionally filtered by query parameters.
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of listings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   createdDate:
 *                     type: number
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       userId:
 *                         type: string
 *                   details:
 *                     type: object
 *                     properties:
 *                       animalType:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       breed:
 *                         type: string
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: string
 *                       location:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *                           city:
 *                             type: string
 *                       age:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       healthDetails:
 *                         type: object
 *                         properties:
 *                           isVaccinated:
 *                             type: boolean
 *                           isNeutered:
 *                             type: boolean
 *                           isDewormed:
 *                             type: boolean
 *                           isHouseTrained:
 *                             type: boolean
 *                           hasSpecialNeeds:
 *                             type: boolean
 *                       fromWhere:
 *                         type: string
 *                   contactDetails:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                   isApproved:
 *                     type: boolean
 *             examples:
 *               listExample:
 *                 value: [
 *                   {
 *                     "title": "Adorable Calico Cat",
 *                     "createdDate": 1652313600000,
 *                     "createdBy": {
 *                       "name": "John Doe",
 *                       "userId": "123abc"
 *                     },
 *                     "details": {
 *                       "animalType": "cat",
 *                       "name": "Mittens",
 *                       "description": "Friendly and playful",
 *                       "breed": "Calico",
 *                       "photos": ["https://example.com/photo1.jpg"],
 *                       "location": {
 *                         "country": "USA",
 *                         "city": "San Francisco"
 *                       },
 *                       "age": "adult",
 *                       "gender": "female",
 *                       "healthDetails": {
 *                         "isVaccinated": true,
 *                         "isNeutered": true,
 *                         "isDewormed": false,
 *                         "isHouseTrained": true
 *                       },
 *                       "fromWhere": "shelter"
 *                     },
 *                     "contactDetails": {
 *                       "email": "contact@example.com",
 *                       "phone": "123-456-7890"
 *                     },
 *                     "isApproved": true
 *                   }
 *                 ]
 *     security:
 *       - Bearer: []
 */
router.get("/", auth_1.isAdmin, auth_1.getUserFromToken, listing_1.ListingController.getAll);
/**
 * @swagger
 * /listing/search:
 *   get:
 *     summary: Retrieves a list of approved listings
 *     description: This endpoint retrieves all listings, optionally filtered by query parameters.
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of listings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   createdDate:
 *                     type: number
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       userId:
 *                         type: string
 *                   details:
 *                     type: object
 *                     properties:
 *                       animalType:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       breed:
 *                         type: string
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: string
 *                       location:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *                           city:
 *                             type: string
 *                       age:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       healthDetails:
 *                         type: object
 *                         properties:
 *                           isVaccinated:
 *                             type: boolean
 *                           isNeutered:
 *                             type: boolean
 *                           isDewormed:
 *                             type: boolean
 *                           isHouseTrained:
 *                             type: boolean
 *                           hasSpecialNeeds:
 *                             type: boolean
 *                       fromWhere:
 *                         type: string
 *                   contactDetails:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                   isApproved:
 *                     type: boolean
 *             examples:
 *               listExample:
 *                 value: [
 *                   {
 *                     "title": "Adorable Calico Cat",
 *                     "createdDate": 1652313600000,
 *                     "createdBy": {
 *                       "name": "John Doe",
 *                       "userId": "123abc"
 *                     },
 *                     "details": {
 *                       "animalType": "cat",
 *                       "name": "Mittens",
 *                       "description": "Friendly and playful",
 *                       "breed": "Calico",
 *                       "photos": ["https://example.com/photo1.jpg"],
 *                       "location": {
 *                         "country": "USA",
 *                         "city": "San Francisco"
 *                       },
 *                       "age": "adult",
 *                       "gender": "female",
 *                       "healthDetails": {
 *                         "isVaccinated": true,
 *                         "isNeutered": true,
 *                         "isDewormed": false,
 *                         "isHouseTrained": true
 *                       },
 *                       "fromWhere": "shelter"
 *                     },
 *                     "contactDetails": {
 *                       "email": "contact@example.com",
 *                       "phone": "123-456-7890"
 *                     },
 *                     "isApproved": true
 *                   }
 *                 ]
 *     security:
 *       - Bearer: []
 */
router.get("/search", auth_1.getUserFromToken, listing_1.ListingController.search);
/**
 * @swagger
 * /listing/user:
 *   get:
 *     summary: Retrieves a list of listings created by the user
 *     description: This endpoint retrieves listings created by the user, optionally filtered by query parameters.
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of listings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   createdDate:
 *                     type: number
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       userId:
 *                         type: string
 *                   details:
 *                     type: object
 *                     properties:
 *                       animalType:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       breed:
 *                         type: string
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: string
 *                       location:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *                           city:
 *                             type: string
 *                       age:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       healthDetails:
 *                         type: object
 *                         properties:
 *                           isVaccinated:
 *                             type: boolean
 *                           isNeutered:
 *                             type: boolean
 *                           isDewormed:
 *                             type: boolean
 *                           isHouseTrained:
 *                             type: boolean
 *                           hasSpecialNeeds:
 *                             type: boolean
 *                       fromWhere:
 *                         type: string
 *                   contactDetails:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                   isApproved:
 *                     type: boolean
 *             examples:
 *               listExample:
 *                 value: [
 *                   {
 *                     "title": "Adorable Calico Cat",
 *                     "createdDate": 1652313600000,
 *                     "createdBy": {
 *                       "name": "John Doe",
 *                       "userId": "123abc"
 *                     },
 *                     "details": {
 *                       "animalType": "cat",
 *                       "name": "Mittens",
 *                       "description": "Friendly and playful",
 *                       "breed": "Calico",
 *                       "photos": ["https://example.com/photo1.jpg"],
 *                       "location": {
 *                         "country": "USA",
 *                         "city": "San Francisco"
 *                       },
 *                       "age": "adult",
 *                       "gender": "female",
 *                       "healthDetails": {
 *                         "isVaccinated": true,
 *                         "isNeutered": true,
 *                         "isDewormed": false,
 *                         "isHouseTrained": true
 *                       },
 *                       "fromWhere": "shelter"
 *                     },
 *                     "contactDetails": {
 *                       "email": "contact@example.com",
 *                       "phone": "123-456-7890"
 *                     },
 *                     "isApproved": true
 *                   }
 *                 ]
 *     security:
 *       - Bearer: []
 */
router.get("/user", auth_1.getUserFromToken, listing_1.ListingController.getUsersListings);
/**
 * @swagger
 * /listing/{id}:
 *   get:
 *     summary: Retrieves a specific listing by ID
 *     description: This endpoint retrieves a listing by its unique ID.
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the listing
 *     responses:
 *       200:
 *         description: A listing object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 createdDate:
 *                   type: number
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     userId:
 *                       type: string
 *                 details:
 *                   type: object
 *                   properties:
 *                     animalType:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     breed:
 *                       type: string
 *                     photos:
 *                       type: array
 *                       items:
 *                         type: string
 *                     location:
 *                       type: object
 *                       properties:
 *                         country:
 *                           type: string
 *                         city:
 *                           type: string
 *                     age:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     healthDetails:
 *                       type: object
 *                       properties:
 *                         isVaccinated:
 *                           type: boolean
 *                         isNeutered:
 *                           type: boolean
 *                         isDewormed:
 *                           type: boolean
 *                         isHouseTrained:
 *                           type: boolean
 *                         hasSpecialNeeds:
 *                           type: boolean
 *                     fromWhere:
 *                       type: string
 *                 contactDetails:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                 isApproved:
 *                   type: boolean
 *             examples:
 *               listingExample:
 *                 value: {
 *                   "title": "Adorable Calico Cat",
 *                   "createdDate": 1652313600000,
 *                   "createdBy": {
 *                     "name": "John Doe",
 *                     "userId": "123abc"
 *                   },
 *                   "details": {
 *                     "animalType": "cat",
 *                     "name": "Mittens",
 *                     "description": "Friendly and playful",
 *                     "breed": "Calico",
 *                     "photos": ["https://example.com/photo1.jpg"],
 *                     "location": {
 *                       "country": "USA",
 *                       "city": "San Francisco"
 *                     },
 *                     "age": "adult",
 *                     "gender": "female",
 *                     "healthDetails": {
 *                       "isVaccinated": true,
 *                       "isNeutered": true,
 *                       "isDewormed": false,
 *                       "isHouseTrained": true
 *                     },
 *                     "fromWhere": "shelter"
 *                   },
 *                   "contactDetails": {
 *                     "email": "contact@example.com",
 *                     "phone": "123-456-7890"
 *                   },
 *                   "isApproved": true
 *                 }
 *       404:
 *         description: Listing not found.
 *     security:
 *       - Bearer: []
 */
router.get("/:id", auth_1.getUserFromToken, listing_1.ListingController.getById);
/**
 * @swagger
 * /listing/:
 *   post:
 *     summary: Creates a new listing
 *     description: This endpoint creates a new listing for an animal.
 *     tags: [Listing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: object
 *                 properties:
 *                   animalType:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   breed:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       country:
 *                         type: string
 *                       city:
 *                         type: string
 *                   age:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   healthDetails:
 *                     type: object
 *                     properties:
 *                       isVaccinated:
 *                         type: boolean
 *                       isNeutered:
 *                         type: boolean
 *                       isDewormed:
 *                         type: boolean
 *                       isHouseTrained:
 *                         type: boolean
 *                       hasSpecialNeeds:
 *                         type: boolean
 *                   fromWhere:
 *                     type: string
 *               contactDetails:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *     responses:
 *       201:
 *         description: The created listing.
 *     security:
 *       - Bearer: []
 */
router.post("/", auth_1.getUserFromToken, listing_1.ListingController.create);
/**
 * @swagger
 * /listing/{id}:
 *   put:
 *     summary: Updates a listing
 *     description: This endpoint updates the details of an existing listing.
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the listing to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: object
 *                 properties:
 *                   animalType:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   breed:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       country:
 *                         type: string
 *                       city:
 *                         type: string
 *                   age:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   healthDetails:
 *                     type: object
 *                     properties:
 *                       isVaccinated:
 *                         type: boolean
 *                       isNeutered:
 *                         type: boolean
 *                       isDewormed:
 *                         type: boolean
 *                       isHouseTrained:
 *                         type: boolean
 *                       hasSpecialNeeds:
 *                         type: boolean
 *                   fromWhere:
 *                     type: string
 *               contactDetails:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *     security:
 *       - Bearer: []
 */
router.put("/:id", auth_1.isOwnerOfListing, auth_1.getUserFromToken, listing_1.ListingController.update);
/**
 * @swagger
 * /listing/{id}:
 *   delete:
 *     summary: Deletes a listing
 *     description: This endpoint deletes a listing by its ID.
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the listing to delete
 *     responses:
 *       200:
 *         description: Listing deleted successfully.
 *     security:
 *       - Bearer: []
 */
router.delete("/:id", auth_1.isOwnerOfListing, auth_1.getUserFromToken, listing_1.ListingController.delete);
/**
 * @swagger
 * /listing/{id}/approve:
 *   put:
 *     summary: Approves a listing
 *     description: This endpoint approves a listing, making it visible on the platform.
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the listing to approve
 *     responses:
 *       200:
 *         description: Listing approved successfully.
 *     security:
 *       - Bearer: []
 */
router.put("/:id/approve", auth_1.isAdmin, auth_1.getUserFromToken, listing_1.ListingController.approve);
exports.default = router;

import express from "express";
import { UserController } from "../controllers/user";
import { isAdmin, getUserFromToken } from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Accessible only by PawAdmin.
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized access
 */
router.get("/", isAdmin, getUserFromToken, UserController.getAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details of a specific user by their ID. Accessible only by PawAdmin.
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized access
 */
router.get("/:id", isAdmin, getUserFromToken, UserController.getById);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the system. Accessible only by PawAdmin.
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "johndoe"
 *             email: "johndoe@example.com"
 *             password: "password123"
 *             firstName: "John"
 *             lastName: "Doe"
 *             userType: "paw-seeker"
 *             surveyResults: 
 *               animalPreference: "cat"
 *               ageRange: "adult"
 *               genderPreference: "doesnt-matter"
 *               healthStatus: "healthy"
 *               animalCareHistory: true
 *             country: "USA"
 *             city: "New York"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.post("/", isAdmin, getUserFromToken, UserController.create);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update the details of a specific user. Accessible only by PawAdmin.
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "janedoe"
 *             email: "janedoe@example.com"
 *             password: "newpassword123"
 *             firstName: "Jane"
 *             lastName: "Doe"
 *             userType: "paw-guardian"
 *             surveyResults: 
 *               animalPreference: "dog"
 *               ageRange: "senior"
 *               genderPreference: "female"
 *               healthStatus: "special-needs"
 *               animalCareHistory: false
 *             country: "Canada"
 *             city: "Toronto"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.put("/:id", isAdmin, getUserFromToken, UserController.update);

/**
 * @swagger
 * /user/favorites:
 *   get:
 *     summary: Get user favorites
 *     description: Retrieve a list of favorite listings for the authenticated user.
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A list of favorite listings
 *       401:
 *         description: Unauthorized access
 */
router.get("/favorites/all", getUserFromToken, UserController.getFavorites);

/**
 * @swagger
 * /user/favorites/{listingId}:
 *   post:
 *     summary: Toggle favorite
 *     description: Add or remove a listing from the user's favorites.
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing to toggle
 *     responses:
 *       200:
 *         description: Favorite toggled successfully
 *       401:
 *         description: Unauthorized access
 */
router.post("/favorites/:listingId", getUserFromToken, UserController.toggleFavorite);

export default router;

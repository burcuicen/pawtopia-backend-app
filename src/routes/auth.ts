import express from "express";
import AuthController from "../controllers/auth";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userType:
 *                 type: string
 *               surveyResults:
 *                 type: object
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 * 
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/user:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get user info from token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The user info
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.get("/user", AuthController.getUser);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get current user's profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The user profile
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.get("/profile", AuthController.getUser);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: Update current user's profile
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               surveyResults:
 *                 type: object
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.put("/profile", AuthController.updateProfile);


export default router;

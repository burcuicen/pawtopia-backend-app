"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../controllers/auth"));
var router = express_1.default.Router();
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
router.post("/register", auth_1.default.register);
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
router.post("/login", auth_1.default.login);
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
router.get("/user", auth_1.default.getUser);
exports.default = router;

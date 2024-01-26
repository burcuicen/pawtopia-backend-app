"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       required:
 *         - filename
 *         - path
 *         - uploader
 *       properties:
 *         filename:
 *           type: string
 *           description: Name of the image file.
 *         path:
 *           type: string
 *           description: Path where the image is stored.
 *         uploader:
 *           type: string
 *           description: ID of the user who uploaded the image.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var image_1 = require("../controllers/image");
var router = (0, express_1.Router)();
var upload = (0, multer_1.default)({ dest: 'uploads/' });
/**
 * @swagger
 * /image/upload:
 *   post:
 *     summary: Upload an image
 *     description: Uploads a new image.
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       400:
 *         description: Bad request (e.g., no file uploaded).
 */
router.post('/upload', upload.single('file'), image_1.ImageController.upload);
/**
 * @swagger
 * /image/{id}:
 *   delete:
 *     summary: Delete an image
 *     description: Deletes an image by its ID.
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the image to delete.
 *     responses:
 *       200:
 *         description: Image deleted successfully.
 *       404:
 *         description: Image not found.
 */
router.delete('/:id', image_1.ImageController.delete);
/**
 * @swagger
 * /image/{id}:
 *   get:
 *     summary: Get an image by ID
 *     description: Retrieves an image by its ID.
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the image to retrieve.
 *     responses:
 *       200:
 *         description: A single image.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       404:
 *         description: Image not found.
 */
router.get('/:id', image_1.ImageController.getById);
/**
 * @swagger
 * /image:
 *   get:
 *     summary: List all images
 *     description: Retrieves a list of images.
 *     tags: [Image]
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
 *         description: A list of images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 */
router.get('/', image_1.ImageController.getAll);
exports.default = router;

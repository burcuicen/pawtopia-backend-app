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

import { Router } from 'express'
import multer from 'multer'
import { ImageController } from '../controllers/image'

const router = Router()
const upload = multer({ dest: 'uploads/' })

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
router.post('/upload', upload.single('file'), ImageController.upload)

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
router.delete('/:id', ImageController.delete)

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
router.get('/:id', ImageController.getById)

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
router.get('/', ImageController.getAll)

export default router;

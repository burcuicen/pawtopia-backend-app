import mongoose, { Schema } from "mongoose"

import { IImage } from "../interfaces/image"

const imageSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now }
})
const ImageModel = mongoose.model<IImage>("Image", imageSchema)

export default ImageModel
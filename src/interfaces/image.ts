import { IUser } from "./user"

export interface IImage extends Document {
    filename: string
    path: string
    uploader: IUser
    createdAt: number
}
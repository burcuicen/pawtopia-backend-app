import { IUser } from "./user";
import { Request } from "express";

interface IQueryParams {
    skip?: number;
    limit?: number;
    text?: string;
    sort?: string;
    filter?: string;
}
interface IPaginatedResult<T> {
    items: T[]
    metaData: {
        totalCount: number
    }
}
interface IRequest extends Request {
    userJSON?: IUser
    user?: any // Using any to avoid circular dependency or strict type issues for now, or use IUser & { _id: string }
}
export type { IQueryParams, IPaginatedResult, IRequest }

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
}
export type { IQueryParams, IPaginatedResult, IRequest }
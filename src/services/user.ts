///CRUD FOR USER MODEL
import { IPaginatedResult, IQueryParams } from '../interfaces/base';
import { IUser } from '../interfaces/user';
import { queryBuilder } from '../utils';
import User from '../models/user';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10

export class UserService {
    public static async getAll(queryParams: IQueryParams): Promise<IPaginatedResult<IUser>> {
        const queryObject = queryBuilder(queryParams)

        let query = User.find(queryObject.filter)

        const totalCount = await User.countDocuments(queryObject.filter)

        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort)

        const items = await query.exec()

        const data = {
            items,
            metaData: {
                totalCount
            }
        }

        return data
    }
    public static async getById(id: string): Promise<IUser | null> {
        return await User.findById(id, { password: 0 }).exec()
    }
    public static async create(data: IUser): Promise<IUser> {
        const { username, email, password, firstName, lastName, userType, surveyResults, country, city } = data

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const item = { username, password: hashedPassword, email, firstName, lastName, userType, surveyResults, country, city }

        return await User.create(item)
    }
    public static async update(id: string, data: IUser): Promise<IUser | null> {
        const { username, email, firstName, lastName, userType, surveyResults, country, city } = data

        const item = { username, email, firstName, lastName, userType, surveyResults, country, city }

        return await User.findByIdAndUpdate(id, item, { new: true }).exec()
    }

    public static async toggleFavorite(userId: string, listingId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) return null;

        const isFavorite = user.favorites?.includes(listingId as any);

        if (isFavorite) {
            user.favorites = user.favorites?.filter(id => id.toString() !== listingId);
        } else {
            if (!user.favorites) user.favorites = [];
            user.favorites.push(listingId as any);
        }

        return await user.save();
    }

    public static async getFavorites(userId: string): Promise<any[]> {
        const user = await User.findById(userId).populate('favorites').exec();
        return user?.favorites || [];
    }
}

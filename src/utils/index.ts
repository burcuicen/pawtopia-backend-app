import { IQueryParams } from "../interfaces/base";

export function queryBuilder(queryParams: IQueryParams) {
    const {
        skip = 0,
        limit = 10,
        text = '',
        sort = '',
        filter = '{}'
    } = queryParams;

    const filterObject = JSON.parse(filter);
    let sortObject = {};
    if (sort) {
        const sortFields = sort.split(',').map(field => {
            const [key, order] = field.split(':');
            return { [key.trim()]: order === 'desc' ? -1 : 1 };
        });
        sortObject = Object.assign({}, ...sortFields);
    }

    const queryObject = {
        skip: skip,
        limit: limit,
        filter: filterObject,
        sort: sortObject
    };

    if (text) {
        queryObject.filter = { ...queryObject.filter, $text: { $search: text } };
    }

    return queryObject;
}

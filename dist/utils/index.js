"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = void 0;
function queryBuilder(queryParams) {
    var _a = queryParams.skip, skip = _a === void 0 ? 0 : _a, _b = queryParams.limit, limit = _b === void 0 ? 10 : _b, _c = queryParams.text, text = _c === void 0 ? '' : _c, _d = queryParams.sort, sort = _d === void 0 ? '' : _d, _e = queryParams.filter, filter = _e === void 0 ? '{}' : _e;
    var filterObject = JSON.parse(filter);
    var sortObject = {};
    if (sort) {
        var sortFields = sort.split(',').map(function (field) {
            var _a;
            var _b = field.split(':'), key = _b[0], order = _b[1];
            return _a = {}, _a[key.trim()] = order === 'desc' ? -1 : 1, _a;
        });
        sortObject = Object.assign.apply(Object, __spreadArray([{}], sortFields, false));
    }
    var queryObject = {
        skip: skip,
        limit: limit,
        filter: filterObject,
        sort: sortObject
    };
    if (text) {
        queryObject.filter = __assign(__assign({}, queryObject.filter), { $text: { $search: text } });
    }
    return queryObject;
}
exports.queryBuilder = queryBuilder;

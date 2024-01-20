"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var utils_1 = require("../utils");
var user_1 = __importDefault(require("../models/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var SALT_ROUNDS = 10;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.getAll = function (queryParams) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObject, query, totalCount, items, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryObject = (0, utils_1.queryBuilder)(queryParams);
                        query = user_1.default.find(queryObject.filter);
                        return [4 /*yield*/, user_1.default.countDocuments(queryObject.filter)];
                    case 1:
                        totalCount = _a.sent();
                        query = query.skip(queryObject.skip).limit(queryObject.limit).sort(queryObject.sort);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        items = _a.sent();
                        data = {
                            items: items,
                            metaData: {
                                totalCount: totalCount
                            }
                        };
                        return [2 /*return*/, data];
                }
            });
        });
    };
    UserService.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.default.findById(id, { password: 0 }).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, password, firstName, lastName, userType, surveyResults, country, city, hashedPassword, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = data.username, email = data.email, password = data.password, firstName = data.firstName, lastName = data.lastName, userType = data.userType, surveyResults = data.surveyResults, country = data.country, city = data.city;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
                    case 1:
                        hashedPassword = _a.sent();
                        item = { username: username, password: hashedPassword, email: email, firstName: firstName, lastName: lastName, userType: userType, surveyResults: surveyResults, country: country, city: city };
                        return [4 /*yield*/, user_1.default.create(item)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, firstName, lastName, userType, surveyResults, country, city, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = data.username, email = data.email, firstName = data.firstName, lastName = data.lastName, userType = data.userType, surveyResults = data.surveyResults, country = data.country, city = data.city;
                        item = { username: username, email: email, firstName: firstName, lastName: lastName, userType: userType, surveyResults: surveyResults, country: country, city: city };
                        return [4 /*yield*/, user_1.default.findByIdAndUpdate(id, item, { new: true }).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;

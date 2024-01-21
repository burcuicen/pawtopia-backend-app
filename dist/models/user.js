"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, enum: ['paw-seeker', 'paw-guardian', 'other', 'paw-admin'] },
    surveyResults: {
        purpose: { type: String, enum: ['looking-pet', 'looking-guardian', 'other'] },
        animalPreference: { type: String, enum: ['cat', 'dog', 'other', 'just-looking'] },
        ageRange: { type: String, enum: ['baby', 'adult', 'senior', 'doesnt-matter'] },
        genderPreference: { type: String, enum: ['male', 'female', 'doesnt-matter'] },
        healthStatus: { type: String, enum: ['healthy', 'special-needs', 'doesnt-matter'] },
        animalCareHistory: { type: Boolean },
    },
    country: { type: String, required: true },
    city: { type: String, required: true },
});
var UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;

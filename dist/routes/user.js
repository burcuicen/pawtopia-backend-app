"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
router.get("/", auth_1.isAdmin, user_1.UserController.getAll);
exports.default = router;

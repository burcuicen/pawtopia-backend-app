import express from "express"
import {UserController} from "../controllers/user"
import {isAdmin, getUserFromToken} from "../middlewares/auth"

const router = express.Router()

router.get("/",isAdmin,getUserFromToken,UserController.getAll)
router.get("/:id",isAdmin,getUserFromToken,UserController.getById)
router.post("/",isAdmin,getUserFromToken,UserController.create)
router.put("/:id",isAdmin,getUserFromToken,UserController.update)

export default router
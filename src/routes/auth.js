import express from "express"
import { signup , signin, getOneUser ,updateUser} from "../controllers/auth";

const router = express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/user/:id",getOneUser)
router.put("/user/:id",updateUser)

export default router
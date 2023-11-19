import express from "express";
import { DeleteCategory, UpdateCategory, addCategory , getAllCategory , getOneCategory, getProductInCategory} from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.post("/category",addCategory);
router.get("/category",getAllCategory)
router.get("/category/:id",getOneCategory)
router.put("/category/:id",UpdateCategory)
router.delete("/category/:id",DeleteCategory)
router.delete("/category=:id",getProductInCategory)

export default router
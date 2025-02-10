import express from "express";
import { listCategory, 
    createCategory ,
    renderpageCreateCategory,
    renderpageUpdateCategory,
    renderpageDeleteCategory,
    updateCategory,
    deleteCategory
} from "../controller/categoryController.js";
const router = express.Router();

router.get("/", listCategory)

router.get("/create", renderpageCreateCategory)
router.post("/create", createCategory)

router.get("/update/:id", renderpageUpdateCategory)
router.post("/update/", updateCategory)

router.get("/delete/:id", renderpageDeleteCategory)
router.post("/delete/", deleteCategory)

export default router;
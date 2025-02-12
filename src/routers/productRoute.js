import express from "express";
import {
  listProduct,
  createProduct,
  renderpageCreateProduct,
  renderpageUpdateProduct,
  renderpageDeleteProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
const router = express.Router();

router.get("/", listProduct);

router.get("/create", renderpageCreateProduct);
router.post("/create", createProduct);

router.get("/update/:id", renderpageUpdateProduct);
router.post("/update/:id", updateProduct);

router.get("/delete/:id", renderpageDeleteProduct);
router.post("/delete/", deleteProduct);

export default router;

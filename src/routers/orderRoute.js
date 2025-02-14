import express from "express";
import {
  listOrder,
  createOrder,
  
} from "../controller/orderController.js";
const router = express.Router();

router.get("/", listOrder);


router.post("/create", createOrder);


export default router;

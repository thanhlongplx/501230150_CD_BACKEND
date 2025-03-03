import express from "express";
import { listOrder, createOrder, renderPageSimulateCreateOrder } from "../controller/orderController.js";
const router = express.Router();

router.get("/", listOrder);

router.get("/create", renderPageSimulateCreateOrder);
router.post("/create", createOrder);

export default router;

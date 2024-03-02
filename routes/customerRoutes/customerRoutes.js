import express from "express";
import { getCustomerData } from "../../controllers/customer/customerController.js";

const router = express.Router();

router.get("/customer", getCustomerData);

export default router;

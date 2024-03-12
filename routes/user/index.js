import express from "express";
import customerRoutes from "./customerRoutes.js";
import usersRoutes from "./userRoutes.js";
import salesRoutes from "./salesRoutes.js";
import executiveRoutes from "./executiveRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

router.use(customerRoutes);
router.use(usersRoutes);
router.use(salesRoutes);
router.use(executiveRoutes);
router.use(productRoutes);

export default router;

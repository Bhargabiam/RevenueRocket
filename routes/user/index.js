import express from "express";
import customerRoutes from "./customerRoutes.js";
import usersRoutes from "./userRoutes.js";
import salesRoutes from "./salesRoutes.js";
const router = express.Router();

router.use(customerRoutes);
router.use(usersRoutes);
router.use(salesRoutes);

export default router;

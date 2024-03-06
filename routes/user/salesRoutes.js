import express from "express";
import {
  processDataByMobile,
  processDataById,
  addNewProcessData,
} from "../../controllers/sales/salesController.js";

const router = express.Router();

router.route("/processList").get(processDataByMobile);
router.route("/processData").get(processDataById);
router.route("/newProcess/:id").post(addNewProcessData);

export default router;

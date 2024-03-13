import express from "express";
import {
  salesReport,
  processReport,
  fullReport,
  executiveSaleReport,
  executiveFullReport,
} from "../../controllers/user/report.controller.js";
import { executiveIdValidator } from "../../validations/Id.validation.js";
const router = express.Router();

router.route("/salesReport").get(salesReport);
router.route("/processReport").get(processReport);
router.route("/fullReport").get(fullReport);
router
  .route("/executiveSaleReport")
  .get(executiveIdValidator, executiveSaleReport);
router
  .route("/executiveFullReport")
  .get(executiveIdValidator, executiveFullReport);

export default router;

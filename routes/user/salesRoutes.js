import express from "express";
import {
  processDataByMobile,
  processDataById,
  addNewProcessData,
  patchProcessData,
  processDisable,
  newSaleData,
  processLimitedData,
  inprocessToSale,
} from "../../controllers/sales/salesController.js";
import {
  customerIdValidator,
  processIdValidator,
  processIdQueryValidator,
} from "../../validations/Id.validation.js";

import saleFormValidation from "../../validations/saleForm.validation.js";

const router = express.Router();

router.route("/processList").get(processDataByMobile);
router.route("/processData").get(processIdQueryValidator, processDataById);
router
  .route("/processLimitedData/:processId")
  .get(processIdValidator, processLimitedData);
router
  .route("/newProcess/:customerId")
  .post(customerIdValidator, addNewProcessData);
router
  .route("/newSale/:customerId")
  .post(customerIdValidator, saleFormValidation, newSaleData);
router.route("/addSale/:processId").post(processIdValidator, inprocessToSale);
router
  .route("/updateProcess/:processId")
  .patch(processIdValidator, patchProcessData);
router
  .route("/deleteProcess/:processId")
  .patch(processIdValidator, processDisable);

export default router;

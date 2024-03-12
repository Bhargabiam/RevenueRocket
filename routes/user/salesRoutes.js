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
import processFormValidation from "../../validations/processForm.validation.js";
import saleUpdateFormValidation from "../../validations/saleUpdate.validation.js";
import processUpdateFormValidation from "../../validations/processUpdate.validation.js";

const router = express.Router();

router.route("/processList").get(processDataByMobile);
router.route("/processData").get(processIdQueryValidator, processDataById);
router
  .route("/processLimitedData/:processId")
  .get(processIdValidator, processLimitedData);
router
  .route("/newProcess/:customerId")
  .post(customerIdValidator, processFormValidation, addNewProcessData);
router
  .route("/newSale/:customerId")
  .post(customerIdValidator, saleFormValidation, newSaleData);
router
  .route("/addSale/:processId")
  .post(processIdValidator, saleUpdateFormValidation, inprocessToSale);
router
  .route("/updateProcess/:processId")
  .patch(processIdValidator, processUpdateFormValidation, patchProcessData);
router
  .route("/deleteProcess/:processId")
  .patch(processIdValidator, processDisable);

export default router;

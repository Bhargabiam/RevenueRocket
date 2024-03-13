import express from "express";
import {
  customerList,
  getCustomerData,
  customerMobile,
  newCustomer,
} from "../../controllers/user/customerController.js";

const router = express.Router();

router.route("/customers").get(customerList);
router.route("/customerById").get(getCustomerData);
router.route("/customerByMobile").get(customerMobile);
router.route("/newCustomer").post(newCustomer);

export default router;

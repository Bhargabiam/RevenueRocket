import express from "express";
import {
  getExecutive,
  getExecutiveList,
  createExecutive,
  deleteExecutive,
} from "../../controllers/executive/executive.controller.js";
import { executiveIdValidator } from "../../validations/Id.validation.js";
const router = express.Router();

router.route("/executive").get(executiveIdValidator, getExecutive);
router.route("/executiveList").get(getExecutiveList);
router.route("/addExecutive").post(createExecutive);
router.route("/deleteExecutive").patch(executiveIdValidator, deleteExecutive);

export default router;

import express from "express";
import {
  getUser,
  userList,
  userEmail,
  userPending,
  allowUser,
  denyUser,
} from "../../controllers/user/userController.js";

import { userIdQueryValidator } from "../../validations/Id.validation.js";

const router = express.Router();

router.route("/user").get(userIdQueryValidator, getUser);
router.route("/userList").get(userList);
router.route("/userEmail").get(userEmail);
router.route("/pendingList").get(userPending);
router.route("/allowUser").patch(userIdQueryValidator, allowUser);
router.route("/denyUser").patch(userIdQueryValidator, denyUser);

export default router;

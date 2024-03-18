import express from "express";
import {
  getUser,
  userList,
  userEmail,
  userPending,
  allowUser,
  denyUser,
  userLogin,
  logout,
  checkUser,
  fileUpload,
} from "../../controllers/user/userController.js";

import { userIdQueryValidator } from "../../validations/Id.validation.js";
import upload from "../../middleware/multer.js";

const router = express.Router();

router.route("/user").get(userIdQueryValidator, getUser);
router.route("/userList").get(userList);
router.route("/userEmail").get(userEmail);
router.route("/pendingList").get(userPending);
router.route("/allowUser").patch(userIdQueryValidator, allowUser);
router.route("/denyUser").patch(userIdQueryValidator, denyUser);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
router.route("/upload").post(upload.single("file"), fileUpload);
router.route("/check").get(checkUser);

export default router;

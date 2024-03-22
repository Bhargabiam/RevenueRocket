import express from "express";
import {
  getUser,
  userList,
  userEmail,
  userPending,
  allowUser,
  denyUser,
  userLogin,
  userRegister,
  adminLogin,
  logout,
  checkUser,
  fileUpload,
} from "../../controllers/user/userController.js";
import isAuthenticated from "../../middleware/checkAuth.js";
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
router.route("/register").post(userRegister);
router.route("/logout").get(logout);
router.route("/adminLogin").post(adminLogin);
router.route("/brand").post(upload.single("file"), fileUpload);
router.route("/check").get(checkUser);

export default router;

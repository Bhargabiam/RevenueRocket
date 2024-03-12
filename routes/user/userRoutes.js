import express from "express";
import {
  getUser,
  userList,
  userEmail,
} from "../../controllers/user/userController.js";

const router = express.Router();

router.route("/user").get(getUser);
router.route("/userList").get(userList);

export default router;

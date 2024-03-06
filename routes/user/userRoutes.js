import express from "express";
import { userList } from "../../controllers/user/userController.js";

const router = express.Router();

router.route("/users").get(userList);

export default router;

import express from "express";
import {
  loginController,
  adminLoginController,
  dashboardController,
  adminPageController,
  registerController,
  logoController,
} from "../../controllers/user/pagesControler.js";
import isAuthenticated from "../../middleware/checkAuth.js";

const router = express.Router();

router.route("/login").get(loginController);
router.route("/adminLogin").get(adminLoginController);
router.route("/dashboard").get(isAuthenticated, dashboardController);
router.route("/admin").get(adminPageController);
router.route("/register").get(registerController);
router.route("/logo").get(logoController);

export default router;

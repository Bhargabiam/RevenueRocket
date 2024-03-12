import express from "express";
import {
  getProduct,
  productList,
  createProduct,
  deleteProduct,
} from "../../controllers/product/product.controller.js";
import { productIdValidator } from "../../validations/Id.validation.js";

const router = express.Router();

router.route("/product").get(productIdValidator, getProduct);
router.route("/productList").get(productList);
router.route("/newProduct").post(createProduct);
router.route("/deleteProduct").patch(productIdValidator, deleteProduct);

export default router;

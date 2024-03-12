import { body, validationResult } from "express-validator";

const saleUpdateFormValidation = [
  body("sec_mobile")
    .trim()
    .isInt()
    .optional()
    .withMessage("Wrong Mobile Number"),
  body("metal_type")
    .trim()
    .isIn(["Gold", "Diamond"])
    .withMessage("Field value must be 'Gold' or 'Diamond'"),
  body("executive_name")
    .trim()
    .notEmpty()
    .matches(/^EXUT_\d{6}_\d{4}$/)
    .withMessage("Executive Id was Wrong"),
  body("associate_name")
    .trim()
    .optional()
    .matches(/^EXUT_\d{6}_\d{4}$/)
    .withMessage("Associate Id was Wrong"),
  body("product_name")
    .trim()
    .notEmpty()
    .matches(/^PROD_\d{6}_\d{4}$/)
    .withMessage("Product Id was Wrong"),
  body("fm_name")
    .trim()
    .optional()
    .isString()
    .withMessage("Fm Name must be a string"),
  body("current_status")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Current Status Field is required"),
  body("non_conversion").trim().isString().optional(),
  body("remarks").trim().isString().optional(),
  body("sale_date")
    .trim()
    .toDate()
    .notEmpty()
    .withMessage("sale date is required"),
  body("follwup_date")
    .trim()
    .toDate()
    .notEmpty()
    .withMessage("followup date is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default saleUpdateFormValidation;

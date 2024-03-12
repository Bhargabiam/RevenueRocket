import { query, param, validationResult } from "express-validator";

const customerIdValidator = [
  param("customerId", "Invalid Customer ID")
    .trim()
    .matches(/^HYD_\d{10}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const userIdValidator = [
  param("userId", "Invalid User ID")
    .trim()
    .matches(/^USER_\d{10}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const processIdValidator = [
  param("processId", "Invalid Process ID")
    .trim()
    .matches(/^VDR_\d{10}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const processIdQueryValidator = [
  param("processId", "Invalid Process ID")
    .trim()
    .matches(/^VDR_\d{10}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const saleIdValidator = [
  param("saleId", "Invalid Sale ID")
    .trim()
    .matches(/^VDR_\d{10}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const executiveIdValidator = [
  query("executiveId", "Invalid executive ID")
    .trim()
    .matches(/^EXUT_\d{6}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const productIdValidator = [
  query("productId", "Invalid product ID")
    .trim()
    .matches(/^PROD_\d{6}_\d{4}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export {
  customerIdValidator,
  userIdValidator,
  processIdValidator,
  saleIdValidator,
  processIdQueryValidator,
  executiveIdValidator,
  productIdValidator,
};

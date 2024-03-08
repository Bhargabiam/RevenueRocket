import { body, validationResult } from "express-validator";

const saleFormValidation = [
  body("username").trim().isLength(3).withMessage("User Name Required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// const saleFormValidation = (req, res, next) => {
//   // Validate the request against the schema
// //   saleFormSchema(req);
// console.log(req.body)

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   next();
// };

export default saleFormValidation;

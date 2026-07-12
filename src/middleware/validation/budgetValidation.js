import {body} from "express-validator";

const create = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category is required.")
    .isInt({ min: 1 })
    .withMessage("Please select a valid category."),

  body("month")
    .notEmpty()
    .withMessage("Month is required.")
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 and 12."),

  body("year")
    .notEmpty()
    .withMessage("Year is required.")
    .isInt({ min: 2020, max: 2100 })
    .withMessage("Please enter a valid year."),

  body("amount")
    .notEmpty()
    .withMessage("Budget amount is required.")
    .isFloat({ min: 0.01 })
    .withMessage("Budget amount must be greater than 0."),
];

const update = create;

export default { create, update };
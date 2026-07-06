import { body } from "express-validator";

const create = [
    body("categoryId")
        .notEmpty()
        .withMessage("Category is required.")
        .isInt({ min: 1 })
        .withMessage("Please select a valid category."),

    body("amount")
        .notEmpty()
        .withMessage("Amount is required.")
        .isFloat({min: 0.1 })
        .withMessage("Amount must be greater than 0."),
    
    body("transactionType")
        .notEmpty()
        .withMessage("Transaction type is required.")
        .isIn(["income", "expense"])
        .withMessage("Transaction type must be income or expense."),
    
    body("description")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 255})
        .withMessage("Description cannot exceed 255 characters."),

    body("TransactionDate")
        .notEmpty()
        .withMessage("Transaction Date is required.")
        .isISO8601()
        .withMessage("Please enter a valid date.")
];

const update = create;

export { create, update};
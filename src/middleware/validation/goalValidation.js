import {body} from "express-validator";

const create = [
    body("name")
        .trim()
        .notEmpty("Goal name is required.")
        .isLength({ min: 2, max: 155})
        .withMessage("Goal name must be between 2 and 155 characters."),

    body("description")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters."),

    body("targetAmount")
        .notEmpty()
        .withMessage("Target amount is required.")
        .isFloat({ min: 0.01 })
        .withMessage("Target amount must be greater than 0."),

    body("targetDate")
        .notEmpty()
        .withMessage("Target date is required.")
        .isISO8601()
        .withMessage("Please enter a valid target date."),

    body("status")
        .optional()
            .isIn(["active", "completed", "paused"])
        .withMessage("Please select a valid goal status."),
    
];

const update = create;

const contribution = [
  body("amount")
    .notEmpty()
    .withMessage("Contribution amount is required.")
    .isFloat({ min: 0.01 })
    .withMessage("Contribution amount must be greater than 0."),

  body("note")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 255 })
    .withMessage("Contribution note cannot exceed 255 characters."),
];

export default { create, update, contribution, };

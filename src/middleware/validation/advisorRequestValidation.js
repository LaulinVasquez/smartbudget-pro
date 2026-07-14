import { body } from "express-validator";

const create = [
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Subject must be between 3 and 150 characters."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters."),
];

const updateStatus = [
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Please select a valid request status."),
];

export default { create, updateStatus, };
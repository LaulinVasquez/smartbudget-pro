import { body } from "express-validator";

const updateRole = [
  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(["user", "advisor", "admin"])
    .withMessage("Please select a valid role."),
];

const createCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters."),

  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),
];

const updateCategory = createCategory;

export default { updateRole, createCategory, updateCategory, };
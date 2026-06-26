import { body } from "express-validator";


  const registration = [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required.")
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters.")
      .matches(/^[A-Za-zÀ-ÿ' -]+$/)
      .withMessage(
        "Name can only contain letters, spaces, hyphens, and apostrophes.",
      ),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required.")
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters.")
      .matches(/^[A-Za-zÀ-ÿ' -]+$/)
      .withMessage(
        "Name can only contain letters, spaces, hyphens, and apostrophes.",
      ),

    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .isLength({ max: 255 })
      .withMessage("Email address is too long."),

    body("emailConfirm")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .custom((value, { req }) => value === req.body.email)
      .withMessage("Email address must match."),

    body("password")
      .isLength({ min: 8, max: 128 })
      .withMessage("Password must be between 8 and 128 characters.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
      .withMessage("Password must contain at least one special character."),

    body("passwordConfirm")
      .notEmpty()
      .withMessage("Please confirm your password.")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password must match."),
  ];

 //   Will be added soon
  login = [],
  updateProfile = [];
  changePassword = [];
  
export default {registration, login, updateProfile, changePassword};

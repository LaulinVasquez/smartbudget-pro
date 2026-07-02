// This will validate rather than having the controllers doing it
import { validationResult } from "express-validator";

const validate = (redirectPath) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next();
    }

    errors.array().forEach((error) => {
        req.flash("error", error.msg)
    });
    return res.redirect(redirectPath);
  };
};

export default validate;

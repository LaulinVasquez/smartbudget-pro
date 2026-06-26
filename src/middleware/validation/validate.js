// This will validate rather than having the controllers doing it
import { validationResult} from "express-validator";

const validate = (req,res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).render("account/register", {
        title: "Register",
        errors: errors.array(),
        formData: req.body,
    });
};

export default validate;
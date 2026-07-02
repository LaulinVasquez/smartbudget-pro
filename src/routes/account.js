import { Router } from "express";
import accountValidation from "../middleware/validation/accountValidation.js";
import validate from "../middleware/validation/validate.js";
import { buildRegister, registerUser, buildLogin } from "../controllers/accountController.js";

const router = Router()
//  GET / register -Retrieve data
router.get("/register", buildRegister);
//  POST /register - Handler registration form submission with validation
router.post("/register",
    accountValidation.registration,
    validate("/register"),
    registerUser
);

router.get("/login", buildLogin);

export default router;
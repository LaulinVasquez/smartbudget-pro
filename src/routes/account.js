import { Router } from "express";
import accountValidation from "../middleware/validation/accountValidation.js";
import validate from "../middleware/validation/validate.js";
import { buildRegister, registerUser, buildLogin, loginUser, logoutUser } from "../controllers/accountController.js";

// This where the app becomes restful

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
// POST /login - Handler login form submission with login validation
router.post("/login",
    accountValidation.login,
    validate("/login"),
    loginUser
);

router.post("/logout", logoutUser)
export default router;
import {Router} from "express";
import { buildHome,buildAbout, testErrorPage } from "../controllers/baseController.js";
import { buildLogin, buildRegister } from "../controllers/accountController.js";

// Create a new router instance
const router = Router()


// Base route
router.get("/", buildHome);
router.get("/about", buildAbout);

// Account routes
router.get("/login", buildLogin);
router.get("/register", buildRegister);

router.get("/errors21", testErrorPage);

export default router;
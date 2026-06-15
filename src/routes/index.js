import {Router} from "express";
import { buildHome,buildAbout } from "../controllers/baseController.js";
import { buildLogin, buildRegister } from "../controllers/accountController.js";

// Create a new router instance
const router = Router()


// Home and about
router.get("/", buildHome);
router.get("/about", buildAbout);
router.get("/login", buildLogin);
router.get("/register", buildRegister);

export default router;
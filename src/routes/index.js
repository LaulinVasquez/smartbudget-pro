import {Router} from "express";
import { buildHome,buildAbout, testErrorPage } from "../controllers/baseController.js";
import { buildLogin, buildRegister } from "../controllers/accountController.js";
import accountRoutes from "./account.js"

// Create a new router instance
const router = Router()


// Base route accountRoutes
router.get("/", buildHome); // handles the GET|| POST from account.js it will determine login or register
router.get("/about", buildAbout);

// Account routes
router.get("/login", buildLogin);
router.get("/register", buildRegister);
router.use("/", accountRoutes);

// This a test
router.get("/errors21", testErrorPage);

export default router;
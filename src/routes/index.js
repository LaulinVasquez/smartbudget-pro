import {Router} from "express";
import { buildHome,buildAbout, testErrorPage } from "../controllers/baseController.js";
import accountRoutes from "./account.js";
import dashboardRoutes from "./dashboard.js";
import transactionRoutes from "./transaction.js";
import budgetRoutes from "./budget.js";
import goalRoutes from "./goal.js";

// Create a new router instance
const router = Router()


// Base route accountRoutes
router.get("/", buildHome); // handles the GET|| POST from account.js it will determine login or register
router.get("/about", buildAbout);

// Account routes
router.use("/", accountRoutes);

// Dashboard routes
router.use("/", dashboardRoutes);

// Transactions
router.use("/", transactionRoutes);

// Budget
router.use("/", budgetRoutes);

// Goals
router.use("/", goalRoutes);

// This a test
router.get("/errors21", testErrorPage);

export default router;
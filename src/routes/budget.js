import { Router } from "express";
import { requireLogin, requireRole} from "../middleware/auth/auth.js";
import budgetValidation from "../middleware/validation/budgetValidation.js";
import validate from "../middleware/validation/validate.js";
import {buildBudgets, addBudget, buildEditBudget, editBudget, removeBudget} from "../controllers/budget/budgetController.js"

const router = Router();

router.get("/budget", 
    requireLogin,
    requireRole("user"),
    buildBudgets,
);

router.post("/budget",
    requireLogin,
    requireRole("user"),
    budgetValidation.create,
    validate("/budget"),
    addBudget,
);

router.get(
  "/budget/:budgetId/edit",
  requireLogin,
  requireRole("user"),
  buildEditBudget,
);

router.post(
  "/budget/:budgetId/edit",
  requireLogin,
  requireRole("user"),
  budgetValidation.update,
  validate("/budget"),
  editBudget,
);

router.post(
  "/budget/:budgetId/delete",
  requireLogin,
  requireRole("user"),
  removeBudget,
);

export default router;
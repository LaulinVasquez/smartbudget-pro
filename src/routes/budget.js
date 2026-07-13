import { Router } from "express";
import { requireLogin, requireRole} from "../middleware/auth/auth.js";
import budgetValidation from "../middleware/validation/budgetValidation.js";
import validate from "../middleware/validation/validate.js";
import {buildBudgets, addBudget, buildEditBudget, editBudget, editBudget, removeBudget} from "../controllers/budget/budgetController.js"

const router = router();

router.get("/budgets", 
    requireLogin,
    requireRole("user"),
    buildBudgets,
);

router.post("/budgets",
    requireLogin,
    requireRole("user"),
    budgetValidation.create,
    validate("/budgets"),
    addBudget,
);

router.get(
  "/budgets/:budgetId/edit",
  requireLogin,
  requireRole("user"),
  buildEditBudget,
);

router.post(
  "/budgets/:budgetId/edit",
  requireLogin,
  requireRole("user"),
  budgetValidation.update,
  validate("/budgets"),
  editBudget,
);

router.post(
  "/budgets/:budgetId/delete",
  requireLogin,
  requireRole("user"),
  removeBudget,
);

export default router;
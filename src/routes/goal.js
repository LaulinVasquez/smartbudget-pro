import { Router } from "express";
import { requireLogin, requireRole} from "../middleware/auth/auth.js"
import goalValidation from "../middleware/validation/goalValidation.js";
import validate from "../middleware/validation/validate.js";
import {buildGoals, addGoal, buildEditGoal, editGoal, removeGoal, contributeToGoal} from "../controllers/goal/goalController.js";

const router = Router();

router.get(
  "/goal",
  requireLogin,
  requireRole("user"),
  buildGoals,
);

router.post(
  "/goal",
  requireLogin,
  requireRole("user"),
  goalValidation.create,
  validate("/goal"),
  addGoal,
);

router.get(
  "/goal/:goalId/edit",
  requireLogin,
  requireRole("user"),
  buildEditGoal,
);

router.post(
  "/goal/:goalId/edit",
  requireLogin,
  requireRole("user"),
  goalValidation.update,
  validate("/goal"),
  editGoal,
);

router.post(
  "/goal/:goalId/contributions",
  requireLogin,
  requireRole("user"),
  goalValidation.contribution,
  validate("/goal"),
  contributeToGoal,
);

router.post(
  "/goal/:goalId/delete",
  requireLogin,
  requireRole("user"),
  removeGoal,
);

export default router;
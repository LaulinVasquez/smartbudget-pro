import { Router } from "express";
import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import { buildUserDashboard } from "../controllers/dashboard/dashboardController.js";

const router = Router();

router.get("/dashboard", requireLogin, buildUserDashboard);

export default router;
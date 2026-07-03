import { Router } from "express";
import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import { buildUserDashboard } from "../controllers/dashboard/userDashboardController.js";
import { buildAdvisorDashboard } from "../controllers/dashboard/advisorDashboardController.js";
import { buildAdminDashboard } from "../controllers/dashboard/adminDashboardController.js";

const router = Router();

router.get("/dashboard", requireLogin, buildUserDashboard);
router.get("/advisor", requireRole("advisor", "admin"), buildAdvisorDashboard);
router.get("/admin", requireRole("admin"), buildAdminDashboard);

export default router;
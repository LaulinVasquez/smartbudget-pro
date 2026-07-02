import { Router } from "express";
import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import { buildUserDashboard, buildAdvisorDashboard, buildAdminDashboard  } from "../controllers/dashboard/dashboardController.js";

const router = Router();

router.get("/dashboard", requireLogin, buildUserDashboard);
router.get("/advisor", requireRole("Advisor", "Admin"), buildAdvisorDashboard);
router.get("/admin", requireRole("Admin"), buildAdminDashboard);

export default router;
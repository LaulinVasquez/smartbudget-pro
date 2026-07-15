import { Router } from "express";

import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import adminValidation from "../middleware/validation/adminValidation.js";
import validate from "../middleware/validation/validate.js";

import { buildAdminDashboard, buildAdminUsers, changeUserRole, buildAdminCategories, addCategory, buildEditCategory, editCategory, removeCategory,} from "../controllers/admin/adminController.js";

const router = Router();

router.get(
  "/admin",
  requireLogin,
  requireRole("admin"),
  buildAdminDashboard,
);

router.get(
  "/admin/users",
  requireLogin,
  requireRole("admin"),
  buildAdminUsers,
);

router.post(
  "/admin/users/:userId/role",
  requireLogin,
  requireRole("admin"),
  adminValidation.updateRole,
  validate("/admin/users"),
  changeUserRole,
);

router.get(
  "/admin/categories",
  requireLogin,
  requireRole("admin"),
  buildAdminCategories,
);

router.post(
  "/admin/categories",
  requireLogin,
  requireRole("admin"),
  adminValidation.createCategory,
  validate("/admin/categories"),
  addCategory,
);

router.get(
  "/admin/categories/:categoryId/edit",
  requireLogin,
  requireRole("admin"),
  buildEditCategory,
);

router.post(
  "/admin/categories/:categoryId/edit",
  requireLogin,
  requireRole("admin"),
  adminValidation.updateCategory,
  validate("/admin/categories"),
  editCategory,
);

router.post(
  "/admin/categories/:categoryId/delete",
  requireLogin,
  requireRole("admin"),
  removeCategory,
);

export default router;
import { Router } from "express";

import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import advisorRequestValidation from "../middleware/validation/advisorRequestValidation.js";
import validate from "../middleware/validation/validate.js";

import { buildUserAdvisorRequests, submitAdvisorRequest, removeAdvisorRequest, buildAdvisorRequests, buildAdvisorRequestDetails, acceptAdvisorRequest, changeAdvisorRequestStatus, } from "../controllers/advisor/advisorRequestController.js";

const router = Router();

/* User routes */

router.get(
  "/advisor-requests",
  requireLogin,
  requireRole("user"),
  buildUserAdvisorRequests,
);

router.post(
  "/advisor-requests",
  requireLogin,
  requireRole("user"),
  advisorRequestValidation.create,
  validate("/advisor-requests"),
  submitAdvisorRequest,
);

router.post(
  "/advisor-requests/:requestId/delete",
  requireLogin,
  requireRole("user"),
  removeAdvisorRequest,
);

/* Advisor routes */

router.get(
  "/advisor",
  requireLogin,
  requireRole("advisor"),
  buildAdvisorRequests,
);

router.get(
  "/advisor/requests/:requestId",
  requireLogin,
  requireRole("advisor"),
  buildAdvisorRequestDetails,
);

router.post(
  "/advisor/requests/:requestId/accept",
  requireLogin,
  requireRole("advisor"),
  acceptAdvisorRequest,
);

router.post(
  "/advisor/requests/:requestId/status",
  requireLogin,
  requireRole("advisor"),
  advisorRequestValidation.updateStatus,
  validate("/advisor"),
  changeAdvisorRequestStatus,
);

export default router;
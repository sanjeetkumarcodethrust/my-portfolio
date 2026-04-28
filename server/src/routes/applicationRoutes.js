import express from "express";
import {
  applyToJob,
  getApplicantsForJob,
  getCandidateDashboard,
  getMyApplications,
  updateApplicationStatus
} from "../controllers/applicationController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/candidate/dashboard", protect, authorize("candidate"), getCandidateDashboard);
router.get("/me", protect, authorize("candidate"), getMyApplications);
router.post("/jobs/:jobId", protect, authorize("candidate"), applyToJob);
router.get("/jobs/:jobId/applicants", protect, authorize("recruiter"), getApplicantsForJob);
router.patch("/:applicationId/status", protect, authorize("recruiter"), updateApplicationStatus);

export default router;

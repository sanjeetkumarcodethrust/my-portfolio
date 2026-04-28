import express from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  getRecruiterDashboard,
  getRecruiterJobs,
  updateJob
} from "../controllers/jobController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/recruiter/dashboard", protect, authorize("recruiter"), getRecruiterDashboard);
router.get("/recruiter/my-jobs", protect, authorize("recruiter"), getRecruiterJobs);
router.post("/", protect, authorize("recruiter"), createJob);
router.get("/:id", getJobById);
router.put("/:id", protect, authorize("recruiter"), updateJob);
router.delete("/:id", protect, authorize("recruiter"), deleteJob);

export default router;

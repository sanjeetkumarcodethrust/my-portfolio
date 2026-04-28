import express from "express";
import { getProfile, getSavedJobs, toggleSavedJob, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, upload.single("resume"), updateProfile);
router.get("/saved-jobs", protect, getSavedJobs);
router.post("/saved-jobs/:jobId", protect, toggleSavedJob);

export default router;

import express from "express";
import { getMyCompany, upsertCompany } from "../controllers/companyController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/me")
  .get(protect, authorize("recruiter"), getMyCompany)
  .post(protect, authorize("recruiter"), upsertCompany);

export default router;

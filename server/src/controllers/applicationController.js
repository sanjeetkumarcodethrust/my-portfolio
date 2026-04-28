import mongoose from "mongoose";
import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const applyToJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId).populate("company", "name");

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const existingApplication = await Application.findOne({
    candidate: req.user._id,
    job: job._id
  });

  if (existingApplication) {
    res.status(400);
    throw new Error("You have already applied to this job");
  }

  const application = await Application.create({
    candidate: req.user._id,
    recruiter: job.recruiter,
    job: job._id,
    company: job.company._id,
    coverLetter: req.body.coverLetter || "",
    resumeSnapshot: req.user.resume
      ? {
          url: req.user.resume.url,
          originalName: req.user.resume.originalName
        }
      : null
  });

  job.applicantsCount += 1;
  await job.save();

  const populatedApplication = await Application.findById(application._id)
    .populate("job", "title location type")
    .populate("company", "name");

  res.status(201).json({
    message: "Application submitted successfully",
    application: populatedApplication
  });
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ candidate: req.user._id })
    .populate({
      path: "job",
      select: "title location type status salaryMin salaryMax",
      populate: {
        path: "company",
        select: "name location industry logo"
      }
    })
    .sort({ createdAt: -1 });

  res.json({ applications });
});

export const getApplicantsForJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.jobId, recruiter: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const applications = await Application.find({ job: req.params.jobId })
    .populate("candidate", "name email skills experienceYears location headline resume")
    .sort({ createdAt: -1 });

  res.json({ applications });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.applicationId);

  if (!application || String(application.recruiter) !== String(req.user._id)) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.status = req.body.status;
  application.notes = req.body.notes ?? application.notes;
  await application.save();

  res.json({
    message: "Application status updated",
    application
  });
});

export const getCandidateDashboard = asyncHandler(async (req, res) => {
  const candidateId = new mongoose.Types.ObjectId(req.user._id);

  const [applicationsCount, statusBreakdown, recentApplications] = await Promise.all([
    Application.countDocuments({ candidate: candidateId }),
    Application.aggregate([
      { $match: { candidate: candidateId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Application.find({ candidate: candidateId })
      .populate("job", "title location")
      .populate("company", "name")
      .sort({ createdAt: -1 })
      .limit(5)
  ]);

  res.json({
    stats: {
      applicationsCount,
      savedJobsCount: req.user.savedJobs.length,
      statusBreakdown
    },
    recentApplications
  });
});

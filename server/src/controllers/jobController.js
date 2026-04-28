import mongoose from "mongoose";
import { Job } from "../models/Job.js";
import { Company } from "../models/Company.js";
import { Application } from "../models/Application.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { buildJobFilters, getSortOption } from "../utils/queryFeatures.js";

export const getJobs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const filters = buildJobFilters(req.query);

  const [jobs, total] = await Promise.all([
    Job.find(filters)
      .populate("company", "name location industry logo")
      .populate("recruiter", "name email")
      .sort(getSortOption(req.query.sortBy))
      .skip(skip)
      .limit(limit),
    Job.countDocuments(filters)
  ]);

  res.json({
    jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("company", "name location industry website size about logo")
    .populate("recruiter", "name email");

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const applicationCount = await Application.countDocuments({ job: job._id });
  res.json({ job, applicationCount });
});

export const createJob = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ createdBy: req.user._id });

  if (!company) {
    res.status(400);
    throw new Error("Create your company profile before posting jobs");
  }

  const job = await Job.create({
    ...req.body,
    skills: req.body.skills || [],
    responsibilities: req.body.responsibilities || [],
    perks: req.body.perks || [],
    recruiter: req.user._id,
    company: company._id
  });

  const populatedJob = await Job.findById(job._id)
    .populate("company", "name location industry logo")
    .populate("recruiter", "name email");

  res.status(201).json({
    message: "Job created successfully",
    job: populatedJob
  });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, recruiter: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  Object.assign(job, {
    ...req.body,
    skills: req.body.skills || job.skills,
    responsibilities: req.body.responsibilities || job.responsibilities,
    perks: req.body.perks || job.perks
  });

  await job.save();

  const populatedJob = await Job.findById(job._id)
    .populate("company", "name location industry logo")
    .populate("recruiter", "name email");

  res.json({
    message: "Job updated successfully",
    job: populatedJob
  });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, recruiter: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  await Application.deleteMany({ job: job._id });
  res.json({ message: "Job deleted successfully" });
});

export const getRecruiterJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user._id })
    .populate("company", "name location industry")
    .sort({ createdAt: -1 });

  res.json({ jobs });
});

export const getRecruiterDashboard = asyncHandler(async (req, res) => {
  const recruiterId = new mongoose.Types.ObjectId(req.user._id);

  const [jobsPosted, totalApplicants, statusBreakdown, recentApplications] = await Promise.all([
    Job.countDocuments({ recruiter: recruiterId }),
    Application.countDocuments({ recruiter: recruiterId }),
    Application.aggregate([
      { $match: { recruiter: recruiterId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Application.find({ recruiter: recruiterId })
      .populate("candidate", "name email skills experienceYears")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(5)
  ]);

  res.json({
    stats: {
      jobsPosted,
      totalApplicants,
      statusBreakdown
    },
    recentApplications
  });
});

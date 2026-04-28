import { User } from "../models/User.js";
import { Job } from "../models/Job.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { uploadResumeFile } from "../utils/uploadResume.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("savedJobs");

  res.json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const uploadedResume = await uploadResumeFile(req.file);

  user.name = req.body.name ?? user.name;
  user.headline = req.body.headline ?? user.headline;
  user.bio = req.body.bio ?? user.bio;
  user.location = req.body.location ?? user.location;
  user.phone = req.body.phone ?? user.phone;
  user.experienceYears = Number(req.body.experienceYears ?? user.experienceYears);
  user.skills = req.body.skills
    ? Array.isArray(req.body.skills)
      ? req.body.skills
      : String(req.body.skills)
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
    : user.skills;

  if (uploadedResume) {
    user.resume = uploadedResume;
  }

  await user.save();

  const safeUser = await User.findById(user._id).select("-password");

  res.json({
    message: "Profile updated successfully",
    user: safeUser
  });
});

export const toggleSavedJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const user = await User.findById(req.user._id);
  const exists = user.savedJobs.some((jobId) => String(jobId) === String(job._id));

  if (exists) {
    user.savedJobs = user.savedJobs.filter((jobId) => String(jobId) !== String(job._id));
  } else {
    user.savedJobs.push(job._id);
  }

  await user.save();
  await user.populate({
    path: "savedJobs",
    populate: {
      path: "company",
      select: "name location industry logo"
    }
  });

  res.json({
    message: exists ? "Job removed from saved list" : "Job saved successfully",
    savedJobs: user.savedJobs
  });
});

export const getSavedJobs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "savedJobs",
    populate: {
      path: "company",
      select: "name location industry logo"
    }
  });

  res.json({ jobs: user.savedJobs });
});

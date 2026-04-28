import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
      default: "Full-time"
    },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior", "Lead"],
      default: "Mid"
    },
    salaryMin: {
      type: Number,
      default: 0
    },
    salaryMax: {
      type: Number,
      default: 0
    },
    skills: {
      type: [String],
      default: []
    },
    responsibilities: {
      type: [String],
      default: []
    },
    perks: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
    applicationDeadline: Date,
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    applicantsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

jobSchema.index({
  title: "text",
  description: "text",
  location: "text",
  skills: "text"
});

export const Job = mongoose.model("Job", jobSchema);

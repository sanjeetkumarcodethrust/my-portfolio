import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    coverLetter: {
      type: String,
      default: ""
    },
    resumeSnapshot: {
      url: String,
      originalName: String
    },
    status: {
      type: String,
      enum: ["submitted", "reviewing", "accepted", "rejected"],
      default: "submitted"
    },
    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);

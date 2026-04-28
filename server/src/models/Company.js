import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    website: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    industry: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    about: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export const Company = mongoose.model("Company", companySchema);

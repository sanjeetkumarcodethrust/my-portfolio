import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const resumeSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    originalName: String
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      required: true
    },
    headline: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    skills: {
      type: [String],
      default: []
    },
    experienceYears: {
      type: Number,
      default: 0
    },
    resume: {
      type: resumeSchema,
      default: null
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
      }
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);

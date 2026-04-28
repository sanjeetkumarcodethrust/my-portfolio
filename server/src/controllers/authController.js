import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const buildAuthUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  headline: user.headline,
  bio: user.bio,
  location: user.location,
  phone: user.phone,
  skills: user.skills,
  experienceYears: user.experienceYears,
  resume: user.resume,
  company: user.company,
  savedJobs: user.savedJobs
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Name, email, password, and role are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    token: generateToken(user._id),
    user: buildAuthUser(user)
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    token: generateToken(user._id),
    user: buildAuthUser(user)
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

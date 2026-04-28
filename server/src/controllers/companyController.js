import { Company } from "../models/Company.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getMyCompany = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ createdBy: req.user._id });
  res.json({ company });
});

export const upsertCompany = asyncHandler(async (req, res) => {
  const payload = {
    name: req.body.name,
    website: req.body.website || "",
    location: req.body.location || "",
    industry: req.body.industry || "",
    size: req.body.size || "",
    about: req.body.about || "",
    logo: req.body.logo || ""
  };

  let company = await Company.findOne({ createdBy: req.user._id });

  if (company) {
    company = await Company.findByIdAndUpdate(company._id, payload, {
      new: true,
      runValidators: true
    });
  } else {
    company = await Company.create({
      ...payload,
      createdBy: req.user._id
    });
  }

  await User.findByIdAndUpdate(req.user._id, { company: company._id });

  res.status(201).json({
    message: "Company profile saved",
    company
  });
});

import fs from "fs/promises";
import path from "path";
import { cloudinary, hasCloudinaryConfig } from "../config/cloudinary.js";
import { env } from "../config/env.js";

export const uploadResumeFile = async (file) => {
  if (!file) {
    return null;
  }

  if (env.uploadMode === "cloudinary" && hasCloudinaryConfig) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "job-portal/resumes",
      resource_type: "raw"
    });

    await fs.unlink(file.path);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      originalName: file.originalname
    };
  }

  const filename = path.basename(file.path);
  return {
    url: `/uploads/${filename}`,
    publicId: "",
    originalName: file.originalname
  };
};

import { connectDB } from "../config/db.js";
import { Company } from "../models/Company.js";
import { Job } from "../models/Job.js";
import { User } from "../models/User.js";
import { Application } from "../models/Application.js";
import { sampleCompany, sampleJobs, sampleUsers } from "../data/sampleData.js";

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      Application.deleteMany({}),
      Job.deleteMany({}),
      Company.deleteMany({}),
      User.deleteMany({})
    ]);

    const [recruiter, candidate] = await User.create(sampleUsers);
    const company = await Company.create({
      ...sampleCompany,
      createdBy: recruiter._id
    });

    recruiter.company = company._id;
    await recruiter.save();

    const jobs = await Job.insertMany(
      sampleJobs.map((job) => ({
        ...job,
        recruiter: recruiter._id,
        company: company._id
      }))
    );

    await Application.create({
      candidate: candidate._id,
      recruiter: recruiter._id,
      job: jobs[0]._id,
      company: company._id,
      coverLetter: "I enjoy building polished candidate experiences and scalable frontend systems.",
      status: "reviewing"
    });

    console.log("Seed completed");
    console.log("Recruiter: recruiter@example.com / Password123!");
    console.log("Candidate: candidate@example.com / Password123!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed", error);
    process.exit(1);
  }
};

seed();

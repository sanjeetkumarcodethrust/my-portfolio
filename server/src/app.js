import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== "production") {
  app.use(morgan("dev"));
}

app.use("/uploads", express.static(path.resolve("server", "src", "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "job-portal-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

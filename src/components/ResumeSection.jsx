import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SectionShell from './SectionShell';

export default function ResumeSection({ resumeUrl }) {
  return (
    <SectionShell
      id="resume"
      eyebrow="Resume"
      title="A resume section ready for recruiter review and quick download"
      description="Your real resume PDF is now connected directly from the project assets, so recruiters can preview or download it without placeholder content."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="resume-frame rounded-[2rem] p-8 shadow-panel"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-300/80 pb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Resume Snapshot</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-slate-900">Sanjeet Kumar</h3>
              <p className="mt-2 text-sm text-slate-600">Full Stack Developer | MERN Stack | DSA Enthusiast</p>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">2026 Edition</div>
          </div>

          <div className="grid gap-6 py-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Strengths</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                <li>Scalable MERN application architecture</li>
                <li>Secure API design and auth flows</li>
                <li>Responsive UI systems with strong motion design</li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Highlights</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                <li>800+ DSA problems solved</li>
                <li>B.E. Electronics & Telecommunication (2023 - 2027)</li>
                <li>Built projects spanning commerce, hiring, and backend utilities</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-5">
            <p className="text-sm font-semibold text-slate-800">Resume preview placeholder</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Replace this with your uploaded PDF preview on the dedicated resume page or keep it as a stylish summary card inside the landing page.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-panel rounded-[2rem] p-6"
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
            Resume Ready
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold text-white">Download-ready from your actual PDF</h3>
          <p className="mt-4 leading-7 text-slate-300">
            The site now uses the resume file you placed in <span className="font-semibold text-white">src/assets</span>. You can still move it to Supabase Storage later if you want a hosted public file.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={resumeUrl || '#'}
              download={Boolean(resumeUrl)}
              target={resumeUrl ? '_blank' : undefined}
              rel={resumeUrl ? 'noreferrer' : undefined}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
                resumeUrl
                  ? 'bg-white text-slate-950 hover:scale-[1.02]'
                  : 'cursor-not-allowed border border-dashed border-white/15 bg-white/[0.03] text-slate-400'
              }`}
            >
              <FiDownload />
              {resumeUrl ? 'Download Resume PDF' : 'Upload resume to enable download'}
            </a>

            <Link
              to="/resume"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <FiExternalLink />
              Open Resume Page
            </Link>
          </div>

          <p className="mt-6 rounded-3xl border border-teal-300/20 bg-teal-300/10 px-4 py-3 text-sm leading-6 text-teal-100">
            Using your local uploaded resume now. Supabase remains available for contact data and optional hosted resume storage.
          </p>
        </motion.div>
      </div>
    </SectionShell>
  );
}

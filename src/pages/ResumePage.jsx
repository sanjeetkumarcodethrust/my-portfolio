import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getResumeUrl } from '../services/supabase';

export default function ResumePage() {
  const resumeUrl = getResumeUrl();

  return (
    <>
      <Seo
        title="Sanjeet Kumar | Resume"
        description="Resume preview page for Sanjeet Kumar with direct PDF preview and download."
        path="/resume"
      />
      <main className="px-4 pb-20 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <FiArrowLeft />
            Back to home
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
            <aside className="glass-panel rounded-[2rem] p-6">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                Resume Hub
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold text-white">Sanjeet Kumar</h1>
              <p className="mt-3 text-lg text-slate-300">Full Stack Developer focused on clean UI, secure APIs, and scalable products.</p>
              <div className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
                <p>Pune, Maharashtra, India</p>
                <p>B.E. Electronics & Telecommunication (2023 - 2027)</p>
                <p>Passionate MERN developer with strong DSA fundamentals and 800+ problems solved.</p>
              </div>

              <a
                href={resumeUrl || '#'}
                download={Boolean(resumeUrl)}
                target={resumeUrl ? '_blank' : undefined}
                rel={resumeUrl ? 'noreferrer' : undefined}
                className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
                  resumeUrl
                    ? 'bg-white text-slate-950 hover:scale-[1.02]'
                    : 'cursor-not-allowed border border-dashed border-white/15 bg-white/[0.03] text-slate-400'
                }`}
              >
                <FiDownload />
                {resumeUrl ? 'Download Resume' : 'Upload resume to enable download'}
              </a>
            </aside>

            <section className="glass-panel min-h-[70vh] overflow-hidden rounded-[2rem] p-3">
              {resumeUrl ? (
                <iframe
                  src={resumeUrl}
                  title="Sanjeet Kumar Resume"
                  className="h-[70vh] w-full rounded-[1.5rem] bg-white"
                />
              ) : (
                <div className="grid h-full min-h-[70vh] place-items-center rounded-[1.5rem] border border-dashed border-white/10 bg-slate-950/35 p-8 text-center">
                  <div className="max-w-md">
                    <p className="font-display text-3xl font-bold text-white">Resume preview unavailable</p>
                    <p className="mt-4 leading-7 text-slate-300">
                      Add a PDF to the project assets or wire one through Supabase Storage and this page will render it automatically.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

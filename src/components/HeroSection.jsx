import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import useTypewriter from '../hooks/useTypewriter';
import { heroRoles, heroStats } from '../data/portfolio';

export default function HeroSection({ onProjectClick, resumeUrl, onResumeClick }) {
  const typedRole = useTypewriter(heroRoles);

  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pt-16">
      <div className="noise section-grid relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 px-6 py-12 shadow-panel sm:px-10 lg:grid-cols-[1.3fr_0.9fr] lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,234,212,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_24%)]" />

        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex rounded-full border border-teal-200/20 bg-teal-300/8 px-4 py-1 text-xs uppercase tracking-[0.34em] text-teal-200"
          >
            Available for impactful builds
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Sanjeet Kumar
            <span className="mt-4 block text-shine animate-shimmer bg-[length:200%_100%] text-2xl sm:text-3xl lg:text-4xl">
              {typedRole}
              <span className="ml-1 inline-block h-8 w-[2px] animate-pulse bg-teal-200 align-middle" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Building scalable web applications with modern technologies and a calm, product-focused approach to every detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={onProjectClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              View Projects
              <FiArrowRight />
            </button>
            <a
              href={resumeUrl || '#resume'}
              download={Boolean(resumeUrl)}
              onClick={(event) => {
                if (!resumeUrl) {
                  event.preventDefault();
                  onResumeClick();
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Download Resume
              <FiDownload />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="mt-12 grid gap-4 sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-3xl px-5 py-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="soft-ring glass-panel relative overflow-hidden rounded-[2rem] p-6"
            >
              <div className="absolute inset-x-10 top-10 h-28 rounded-full bg-teal-300/20 blur-3xl" />
              <div className="absolute bottom-6 right-8 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl" />
              <div className="relative grid gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-400" />
                  <div>
                    <p className="font-display text-xl font-semibold text-white">Developer Dashboard</p>
                    <p className="text-sm text-slate-400">Crafted for recruiters and real products</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Focus Stack</span>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
                      Shipping
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {['React experiences', 'Supabase data flow', 'Performance-minded APIs'].map((item, index) => (
                      <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                          <span>{item}</span>
                          <span>{92 - index * 6}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${92 - index * 6}%` }}
                            transition={{ duration: 1, delay: 0.4 + index * 0.15 }}
                            className="h-full rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 top-8 hidden rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur md:block"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Currently building</p>
              <p className="mt-1 text-sm font-semibold text-white">Smooth, scalable UI systems</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

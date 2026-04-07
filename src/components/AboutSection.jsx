import { motion } from 'framer-motion';
import { education, highlights } from '../data/portfolio';
import profileImage from '../assets/profile.jpeg';
import SectionShell from './SectionShell';

export default function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Designing dependable experiences with engineering depth"
      description="I enjoy turning ambitious ideas into responsive, elegant products that feel fast, trustworthy, and thoughtfully built from frontend to backend."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="glass-panel soft-ring overflow-hidden rounded-[2rem] p-6 sm:p-8"
        >
          <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <img
              src={profileImage}
              alt="Sanjeet Kumar profile"
              className="aspect-[4/5] w-full rounded-[1.5rem] border border-white/10 object-cover object-top"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Education</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-white">{education.degree}</h3>
              <p className="mt-2 text-sm text-slate-400">{education.duration}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Summary</p>
              <p className="mt-3 text-base leading-7 text-slate-300">{education.summary}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5">
          {highlights.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-panel rounded-[2rem] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-teal-300/20 to-cyan-400/10 p-3 text-xl text-teal-200">
                  <Icon />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

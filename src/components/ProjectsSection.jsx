import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import SectionShell from './SectionShell';

function LoadingCard() {
  return (
    <div className="glass-panel animate-pulse rounded-[2rem] p-6">
      <div className="h-4 w-24 rounded-full bg-white/10" />
      <div className="mt-5 h-8 w-2/3 rounded-full bg-white/10" />
      <div className="mt-4 h-4 rounded-full bg-white/10" />
      <div className="mt-2 h-4 w-4/5 rounded-full bg-white/10" />
      <div className="mt-8 flex gap-2">
        <div className="h-8 w-20 rounded-full bg-white/10" />
        <div className="h-8 w-20 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects, loading }) {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Selected work that blends product thinking with engineering focus"
      description="These projects showcase full-stack problem solving, secure data handling, and interfaces designed to feel clean, clear, and recruiter-ready."
    >
      <div className="grid gap-6 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => <LoadingCard key={index} />)
          : projects.map((project, index) => (
              (() => {
                const techStack = project.tech_stack ?? project.tech ?? [];
                const githubUrl = project.github_url ?? project.github ?? '';
                const liveUrl = project.live_url ?? project.live ?? '';

                return (
              <motion.article
                key={project.id ?? project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel group flex h-full flex-col rounded-[2rem] p-6 transition hover:-translate-y-1"
              >
                <span className="inline-flex w-fit rounded-full border border-teal-300/15 bg-teal-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-teal-200">
                  {project.category || 'Featured'}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-slate-300">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {githubUrl ? (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
                    >
                      <FiGithub />
                      GitHub
                    </a>
                  ) : null}
                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                    >
                      <FiArrowUpRight />
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </motion.article>
                );
              })()
            ))}
      </div>
    </SectionShell>
  );
}

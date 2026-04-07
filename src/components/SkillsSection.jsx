import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolio';
import SectionShell from './SectionShell';

export default function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="A stack built for polished interfaces and reliable delivery"
      description="My toolkit leans toward fast-moving product work: expressive frontend experiences, practical backend systems, and the everyday tools that keep teams shipping."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {skillGroups.map(({ title, icon: Icon, items }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-panel rounded-[2rem] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/5 p-3 text-lg text-teal-200">
                <Icon />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
            </div>

            <div className="mt-6 space-y-4">
              {items.map((skill) => (
                <div key={skill.name} className="rounded-3xl border border-white/8 bg-slate-950/40 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-slate-100">{skill.name}</span>
                    <span className="text-sm text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

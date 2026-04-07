import { motion } from 'framer-motion';

export default function SectionShell({ id, eyebrow, title, description, children, className = '' }) {
  return (
    <section id={id} className={`relative px-4 py-20 sm:px-6 lg:px-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-teal-200">
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

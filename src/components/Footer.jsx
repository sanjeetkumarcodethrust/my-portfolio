import { socialLinks } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-4 sm:px-6 lg:px-10">
      <div className="glass-panel mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">Sanjeet Kumar</p>
          <p className="mt-1 text-sm text-slate-400">Building scalable web applications with modern technologies.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

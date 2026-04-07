import { motion } from 'framer-motion';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/portfolio';

export default function Navbar({ activeSection, onNavClick, resumeUrl }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClick = (id) => {
    setOpen(false);
    onNavClick(id);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10"
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 shadow-panel">
        <Link to="/" className="font-display text-lg font-bold tracking-[0.18em] text-slate-100">
          SK
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === '/' && activeSection === link.id;

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleClick(link.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/resume"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/5"
          >
            Resume
          </Link>
          <a
            href={resumeUrl || '#resume'}
            download={Boolean(resumeUrl)}
            onClick={(event) => {
              if (!resumeUrl && location.pathname === '/') {
                event.preventDefault();
                handleClick('resume');
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            <FiDownload />
            Download CV
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open ? (
        <div className="glass-panel mx-auto mt-3 max-w-7xl rounded-3xl px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleClick(link.id)}
                className="rounded-2xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/resume"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
            >
              Resume Page
            </Link>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}

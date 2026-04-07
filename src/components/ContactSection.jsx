import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { contactDetails, socialLinks } from '../data/portfolio';
import { hasSupabaseCredentials, submitContact } from '../services/supabase';
import SectionShell from './SectionShell';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await submitContact(form);
      toast.success('Message sent successfully. Thanks for reaching out!');
      setForm(initialForm);
    } catch (error) {
      toast.error(error.message || 'Unable to send message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let's build something thoughtful, fast, and memorable"
      description="Use the contact form for project ideas, collaboration opportunities, or recruiter outreach. Messages are stored directly in Supabase."
      className="pb-28"
    >
      <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr]">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-panel rounded-[2rem] p-6"
        >
          <h3 className="font-display text-2xl font-semibold text-white">Reach out directly</h3>
          <div className="mt-6 space-y-4">
            {contactDetails.map((item) => (
              <p key={item} className="rounded-3xl border border-white/8 bg-white/[0.03] px-4 py-4 leading-7 text-slate-300">
                {item}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel rounded-[2rem] p-6 sm:p-8"
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-200">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="you@example.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-200">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="Tell me about the role, project, or idea you have in mind."
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting || !hasSupabaseCredentials}
            className={`mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition ${
              submitting || !hasSupabaseCredentials
                ? 'cursor-not-allowed border border-white/10 bg-white/[0.04] text-slate-400'
                : 'bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300 text-slate-950 hover:scale-[1.02]'
            }`}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {!hasSupabaseCredentials ? (
            <p className="mt-5 rounded-3xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
              Add your Supabase URL and publishable key in <code>.env</code> to enable live contact submissions.
            </p>
          ) : null}
        </motion.form>
      </div>
    </SectionShell>
  );
}

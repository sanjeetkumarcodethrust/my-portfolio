import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto h-20 w-20 rounded-[2rem] border border-white/10 bg-gradient-to-br from-teal-300/30 via-cyan-300/10 to-amber-300/20 p-2 shadow-glow">
          <div className="grid h-full place-items-center rounded-[1.4rem] border border-white/10 bg-slate-950/80 font-display text-2xl font-bold text-white">
            SK
          </div>
        </div>
        <p className="mt-6 text-sm uppercase tracking-[0.36em] text-slate-500">Crafting the portfolio</p>
      </motion.div>
    </div>
  );
}

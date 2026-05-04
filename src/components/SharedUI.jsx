export const GlassCard = ({ children, className = "", noPadding = false }) => (
  <div className={`
    bg-white/60 dark:bg-[#0a0f1d]/70 
    backdrop-blur-xl 
    border border-slate-200/50 dark:border-indigo-500/20 
    rounded-2xl shadow-lg 
    transition-all duration-300
    ${noPadding ? '' : 'p-6'} 
    ${className}
  `}>
    {children}
  </div>
);

export const NeonGlow = ({ color = "bg-indigo-500" }) => (
  <div className={`absolute -inset-0.5 ${color} opacity-20 blur-xl rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-500`}></div>
);
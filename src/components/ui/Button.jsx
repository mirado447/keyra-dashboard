function Button({ children, variant = "primary", ...props }) {
  const base = "w-full rounded-xl px-4 py-3 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/40 hover:shadow-violet-500/50",
    secondary: "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-100",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
function Input({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm text-zinc-400">{label}</label>}
      <input
        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:shadow-lg focus:shadow-violet-500/20 transition-all"
        {...props}
      />
    </div>
  );
}

export default Input;
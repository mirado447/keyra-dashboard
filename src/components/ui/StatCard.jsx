function StatCard({ label, value, sublabel, valueColor = "text-white" }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
      {sublabel && <p className="text-xs text-zinc-500 mt-1">{sublabel}</p>}
    </div>
  );
}

export default StatCard;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Users, Calendar, ChevronRight } from "lucide-react";

function ApplicationCard({ application }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(application.public_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center justify-between bg-zinc-900/80 border border-zinc-800 rounded-xl px-5 py-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-9 h-9 shrink-0 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center font-semibold">
          {application.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white">{application.name}</p>
            {application.description && (
              <p className="text-xs text-zinc-500">{application.description}</p>
            )}
          </div>
          <code className="text-zinc-500 text-xs truncate block">{application.public_key}</code>
        </div>
      </div>

      <div className="flex items-center gap-6 shrink-0 ml-4">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
            copied
              ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
              : "text-zinc-400 border-zinc-800 bg-zinc-950 hover:text-zinc-200"
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <span className="flex items-center gap-1.5 text-sm text-zinc-400">
          <Users size={14} /> {application.end_user_count}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-zinc-400">
          <Calendar size={14} />
          {new Date(application.create_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <Link
          to={`/applications/${application.id}`}
          className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 font-medium"
        >
          Details <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ApplicationCard;
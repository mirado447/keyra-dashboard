import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { getApplication, regenerateSecret } from "../api/applications";
import DashboardLayout from "../components/ui/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import ConfirmDialog from "../components/ui/ConfirmDialog";

function ApplicationDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [application, setApplication] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [newSecret, setNewSecret] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getApplication(id, token);
        setApplication(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, token]);

  function handleCopy(value) {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleRegenerate() {
    try {
      const data = await regenerateSecret(id, token);
      setNewSecret(data.private_key);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setShowConfirm(false);
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="text-zinc-400">Loading...</p>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout>
        <p className="text-red-400">{errorMessage}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Link to="/applications" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 mb-6">
        <ArrowLeft size={16} /> Back to Applications
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center font-semibold">
            {application.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{application.name}</h1>
            {application.description && (
              <p className="text-xs text-zinc-500">{application.description}</p>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="End-users" value={application.end_user_count} />
        <StatCard
          label="Created"
          value={new Date(application.create_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        />
      </div>

      {newSecret && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-5">
          <p className="text-amber-400 font-medium text-sm mb-2">⚠ New secret key generated — copy it now</p>
          <code className="block text-zinc-200 text-sm break-all mb-3">{newSecret}</code>
          <button onClick={() => handleCopy(newSecret)} className="text-sm text-amber-300 underline">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
        <p className="text-sm font-semibold text-zinc-300 mb-4">API Credentials</p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-zinc-500">Public Key</p>
            <span className="text-xs text-emerald-400">Client-safe</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
            <code className="text-zinc-300 text-sm flex-1 truncate">{application.public_key}</code>
            <button onClick={() => handleCopy(application.public_key)} className="text-zinc-400 hover:text-zinc-200">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-zinc-500">Secret Key</p>
            <span className="text-xs text-red-400">Server only</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
            <code className="text-zinc-500 text-sm flex-1">••••••••••••••••••••••••</code>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
            >
              <RefreshCw size={12} /> Regenerate
            </button>
          </div>
        </div>
      </div>

      {errorMessage && <p className="text-red-400 text-sm mt-4">{errorMessage}</p>}

      <ConfirmDialog
        open={showConfirm}
        title="Regenerate secret key?"
        description="This will invalidate the current secret key immediately. Any integration using it will stop working until updated."
        confirmLabel="Regenerate"
        onConfirm={handleRegenerate}
        onCancel={() => setShowConfirm(false)}
      />
    </DashboardLayout>
  );
}

export default ApplicationDetailPage;
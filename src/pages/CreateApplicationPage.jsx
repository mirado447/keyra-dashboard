import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, Copy, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { createApplication } from "../api/applications";
import DashboardLayout from "../components/ui/DashboardLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function CreateApplicationPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdApp, setCreatedApp] = useState(null);
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const data = await createApplication(name,description, token);
      setCreatedApp(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(createdApp.private_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <DashboardLayout>
      <Link to="/applications" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 mb-6">
        <ArrowLeft size={16} /> Back to Applications
      </Link>

      {!createdApp ? (
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6">
            <h1 className="text-xl font-bold text-white mb-1">Create a new application</h1>
            <p className="text-zinc-400 text-sm mb-6">
              Each application gets its own key pair for isolated authentication flows.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Application name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Web App"
                required
                disabled={isSubmitting}
              />
              <Input
                label="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Customer-facing web application"
                disabled={isSubmitting}
              />
              {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Application"}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-5">
              <p className="text-amber-400 font-medium text-sm mb-1">⚠ Copy your secret key now</p>
              <p className="text-amber-200/70 text-sm">
                This key will never be shown again. If you lose it, you'll need to regenerate a new one.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-violet-400 font-semibold mb-2">SECRET KEY</p>
              <code className="block text-zinc-200 text-sm break-all mb-3">{createdApp.private_key}</code>
              <button
                onClick={handleCopy}
                className={`w-full flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg border transition-colors ${
                  copied
                    ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
                    : "text-zinc-300 border-zinc-700 bg-zinc-950 hover:text-white"
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy secret key"}
              </button>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 mb-5">
              <p className="text-xs text-zinc-500 font-semibold mb-2">PUBLIC KEY</p>
              <code className="block text-zinc-300 text-sm break-all">{createdApp.public_key}</code>
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-300 mb-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="accent-violet-600"
              />
              I have copied my secret key and understand it will not be shown again.
            </label>

            <Button
              className="w-full"
              disabled={!confirmed}
              onClick={() => navigate(`/applications/${createdApp.id}`)}
            >
              Go to Application →
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default CreateApplicationPage;
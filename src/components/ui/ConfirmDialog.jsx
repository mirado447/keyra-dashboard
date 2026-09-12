import { AlertTriangle } from "lucide-react";
import Button from "./Button";

function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
          <AlertTriangle size={20} />
        </div>
        <h2 className="text-white font-semibold mb-1">{title}</h2>
        <p className="text-zinc-400 text-sm mb-6">{description}</p>
        <div className="flex gap-3">
          <Button variant="secondary" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="w-full bg-amber-500 hover:bg-amber-400 shadow-amber-500/40"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
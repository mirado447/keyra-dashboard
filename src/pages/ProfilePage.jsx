import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { getMe } from "../api/auth";
import DashboardLayout from "../components/ui/DashboardLayout";

function ProfilePage() {
  const { token } = useAuth();
  const [developer, setDeveloper] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getMe(token);
        setDeveloper(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    load();
  }, [token]);

  if (errorMessage) {
    return (
      <DashboardLayout>
        <p className="text-red-400">{errorMessage}</p>
      </DashboardLayout>
    );
  }

  if (!developer) {
    return (
      <DashboardLayout>
        <p className="text-zinc-400">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

        <div className="flex justify-center">
        <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center text-xl font-semibold">
                {developer.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-white font-semibold">{developer.name}</p>
                <p className="text-zinc-500 text-sm">Free plan</p>
            </div>
            </div>

            <div className="space-y-4">
            <div>
                <p className="text-xs text-zinc-500 mb-1">Email address</p>
                <p className="text-zinc-200 text-sm">{developer.email}</p>
            </div>
            <div>
                <p className="text-xs text-zinc-500 mb-1">Member since</p>
                <p className="text-zinc-200 text-sm">
                {new Date(developer.create_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
                </p>
            </div>
            </div>
        </div>
        </div>
    </DashboardLayout>
    );
}

export default ProfilePage;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { getApplications } from "../api/applications";
import { getMe } from "../api/auth";
import DashboardLayout from "../components/ui/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import ApplicationCard from "../components/ApplicationCard";
import Button from "../components/ui/Button";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function ApplicationsPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [developer, setDeveloper] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [appsData, meData] = await Promise.all([
          getApplications(token),
          getMe(token),
        ]);
        setApplications(appsData);
        setDeveloper(meData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const totalUsers = applications.reduce((sum, app) => sum + app.end_user_count, 0);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {getGreeting()}{developer ? `, ${developer.name.split(" ")[0]}` : ""} 👋
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Your apps are running smoothly. Here's what's happening.</p>
        </div>
        <Link to="/applications/new">
          <Button className="w-auto px-5 flex items-center gap-2">
            <Plus size={18} /> New application
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total applications" value={applications.length} />
        <StatCard label="Total end-users" value={totalUsers} valueColor="text-emerald-400" />
        <StatCard label="Auth requests" value="—" sublabel="Coming soon" />
      </div>

      {errorMessage && <p className="text-red-400 text-sm mb-4">{errorMessage}</p>}

      {isLoading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-zinc-500">No applications yet. Create your first one to get started.</p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ApplicationsPage;
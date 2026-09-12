import { NavLink } from "react-router-dom";
import { LayoutGrid, User, FileText, LogOut } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../../context/useAuth";

function DashboardLayout({ children }) {
  const { logout } = useAuth();

  const navItems = [
    { to: "/applications", label: "Applications", icon: LayoutGrid },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/documentation", label: "Documentation", icon: FileText },
  ];

  return (
    <div className="relative h-screen bg-zinc-950 flex overflow-hidden">
      {/* Halos de fond du dashboard, fixés à l'écran, sous tout le reste */}
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <aside className="relative z-10 w-60 border-r border-zinc-800 flex flex-col p-4 shrink-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 w-56 h-56 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2.5 px-2 mb-8">
            <Logo size="sm" />
            <span className="text-lg font-bold text-white">keyra</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-violet-600/15 text-violet-400"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="relative z-10 flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}

export default DashboardLayout;
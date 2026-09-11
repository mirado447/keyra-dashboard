import Logo from "./Logo";

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="flex items-center gap-2.5">
          <Logo/>
          <h1 className="text-2xl font-bold text-white leading-none">keyra</h1>
        </div>
        <p className="text-zinc-400 text-sm">{subtitle}</p>
      </div>

      <div className="w-full max-w-sm bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6">
        {children}
      </div>

      <div className="mt-6 text-sm text-zinc-400">{footer}</div>
    </div>
  );
}

export default AuthLayout;
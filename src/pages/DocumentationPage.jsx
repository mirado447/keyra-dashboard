import DashboardLayout from "../components/ui/DashboardLayout";

const endpoints = [
  {
    method: "POST",
    path: "/apps/{public_key}/register",
    description: "Register a new end-user for your application.",
    body: `{ "name": "Ada", "email": "ada@example.com", "password": "..." }`,
  },
  {
    method: "POST",
    path: "/apps/{public_key}/login",
    description: "Authenticate an end-user and receive an access + refresh token.",
    body: `{ "email": "ada@example.com", "password": "..." }`,
  },
  {
    method: "POST",
    path: "/apps/{public_key}/refresh",
    description: "Exchange a valid refresh token for a new access/refresh pair.",
    body: `{ "refresh_token": "..." }`,
  },
  {
    method: "POST",
    path: "/apps/{public_key}/logout",
    description: "Revoke a refresh token.",
    body: `{ "refresh_token": "..." }`,
  },
];

const methodColors = {
  POST: "text-emerald-400 bg-emerald-500/10",
  GET: "text-violet-400 bg-violet-500/10",
};

function DocumentationPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Documentation</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Integrate Keyra authentication into your application using these endpoints.
      </p>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl space-y-4">
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${methodColors[endpoint.method]}`}>
                  {endpoint.method}
                </span>
                <code className="text-zinc-200 text-sm">{endpoint.path}</code>
              </div>
              <p className="text-zinc-400 text-sm mb-3">{endpoint.description}</p>
              <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400 overflow-x-auto">
                {endpoint.body}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DocumentationPage;
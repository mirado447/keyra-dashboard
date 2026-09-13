import DashboardLayout from "../components/ui/DashboardLayout";

const sections = [
  {
    title: "Developer Authentication",
    description: "Manage your own developer account on Keyra.",
    endpoints: [
      {
        method: "POST",
        path: "/developers/register",
        description: "Create a new developer account.",
        body: `{ "name": "Ada Lovelace", "email": "ada@company.io", "password": "..." }`,
      },
      {
        method: "POST",
        path: "/developers/login",
        description: "Authenticate and receive a JWT access token.",
        body: `{ "email": "ada@company.io", "password": "..." }`,
      },
      {
        method: "GET",
        path: "/developers/me",
        description: "Get the currently authenticated developer's profile. Requires Authorization header.",
        body: null,
      },
    ],
  },
  {
    title: "Applications",
    description: "Manage the applications registered under your developer account.",
    endpoints: [
      {
        method: "POST",
        path: "/applications/",
        description: "Create a new application. Returns the public_key and private_key — the private_key is shown only once.",
        body: `{ "name": "My Web App", "description": "Customer-facing web app" }`,
      },
      {
        method: "GET",
        path: "/applications/",
        description: "List all applications belonging to the authenticated developer, with end-user counts.",
        body: null,
      },
      {
        method: "GET",
        path: "/applications/{id}",
        description: "Get details of a single application you own.",
        body: null,
      },
      {
        method: "POST",
        path: "/applications/{id}/regenerate-secret",
        description: "Invalidate the current secret key and generate a new one. The old key stops working immediately.",
        body: null,
      },
    ],
  },
  {
    title: "End-User Authentication",
    description: "Endpoints your own application's users will call, scoped by your application's public_key.",
    endpoints: [
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
    ],
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
        <div className="w-full max-w-2xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-white mb-1">{section.title}</h2>
              <p className="text-zinc-500 text-sm mb-4">{section.description}</p>

              <div className="space-y-4">
                {section.endpoints.map((endpoint) => (
                  <div key={endpoint.path + endpoint.method} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${methodColors[endpoint.method]}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-zinc-200 text-sm">{endpoint.path}</code>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">{endpoint.description}</p>
                    {endpoint.body && (
                      <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400 overflow-x-auto">
                        {endpoint.body}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DocumentationPage;
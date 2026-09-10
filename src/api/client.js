const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, options);

    const isAuthenticatedRequest = Boolean(options.headers?.Authorization);

    if (response.status === 401 && isAuthenticatedRequest) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expirée, veuillez vous reconnecter");
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const message = Array.isArray(data?.detail)
            ? data.detail.map((err) => err.msg).join(", ")
            : data?.detail || `Erreur ${response.status}`;
        throw new Error(message);
    }

    return data;
}
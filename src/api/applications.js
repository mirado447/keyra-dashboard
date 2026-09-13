import { apiFetch } from "./client";

export function getApplications(token) {
    return apiFetch("/applications/", {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function createApplication(name, token) {
    return apiFetch("/applications/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
}

export function getApplication(id, token) {
  return apiFetch(`/applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function regenerateSecret(id, token) {
  return apiFetch(`/applications/${id}/regenerate-secret`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}
import { apiFetch } from "./client";

export function registerDeveloper(name, email, password) {
    return apiFetch("/developers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
}

export function loginDeveloper(email, password) {
    return apiFetch("/developers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
}
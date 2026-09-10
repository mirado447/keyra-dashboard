import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    function login(accessToken) {
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
    }

    function logout() {
        setToken(null);
        localStorage.removeItem("token");
    }

    const value = { token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
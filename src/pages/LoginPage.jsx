import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginDeveloper } from "../api/auth";
import { useAuth } from "../context/useAuth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await loginDeveloper(email, password);
            login(data.access_token);
            navigate("/applications");
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">Connexion</button>
        </form>
    )
}

export default LoginPage;



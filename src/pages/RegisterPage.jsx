import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDeveloper } from "../api/auth";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerDeveloper(name, email, password);
            navigate("/login");
        } catch(error) {
            setErrorMessage(error.message);
        }        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">S'inscrire</button>
        </form>
    )
}

export default RegisterPage;
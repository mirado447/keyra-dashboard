import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDeveloper } from "../api/auth";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);
        try {
            await registerDeveloper(name, email, password);
            navigate("/login");
        } catch(error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" required autoComplete="name" disabled={isSubmitting} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required autoComplete="email" disabled={isSubmitting}  />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required autoComplete="current-password" disabled={isSubmitting}  />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "S'inscrire"}
            </button>
        </form>
    )
}

export default RegisterPage;
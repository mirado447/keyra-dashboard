import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginDeveloper } from "../api/auth";
import { useAuth } from "../context/useAuth";
import AuthLayout from "../components/ui/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);
        try {
            const data = await loginDeveloper(email, password);
            login(data.access_token);
            navigate("/applications");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout
            subtitle="Welcome back — sign in to continue."
            footer={
                <>
                    No account ?{" "}
                    <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium" >
                        Create one
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@company.io"
                    required
                    disabled={isSubmitting}
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                    disabled={isSubmitting}
                />
                {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Connexion..." : "Connexion"}
                </Button>
            </form>
        </AuthLayout>
    )
}

export default LoginPage;
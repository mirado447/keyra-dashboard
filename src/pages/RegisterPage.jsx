import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerDeveloper } from "../api/auth";
import AuthLayout from "../components/ui/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

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
        <AuthLayout
            subtitle="Create your account to get started"
            footer={
                <>
                    Already have one ?{" "}
                    <Link to={"/login"} className="text-violet-400 hover:text-violet-300 font-medium" >
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                    label="Full name"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ava Lovelace" 
                    required 
                    disabled={isSubmitting} 
                />
                <Input 
                    label="Email address"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="ava@company.io" 
                    required 
                    disabled={isSubmitting} 
                />
                <Input 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="At least 8 characters" 
                    required
                    disabled={isSubmitting}  
                />
                {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enregistrement..." : "S'inscrire"}
                </Button>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;
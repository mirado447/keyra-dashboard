import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
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
  const location = useLocation();
  const { login } = useAuth();

  const justRegistered = location.state?.registered;

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
          No account?{" "}
          <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">
            Create one
          </Link>
        </>
      }
    >
      {justRegistered && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg px-4 py-3 mb-4">
          <CheckCircle2 size={16} />
          Account created successfully. Please sign in.
        </div>
      )}

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
          placeholder="Enter your password"
          required
          disabled={isSubmitting}
        />
        {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
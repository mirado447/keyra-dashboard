import { useAuth } from "../context/useAuth";

function LogoutPage() {
    const { logout } = useAuth();

    return <button onClick={logout}>Se déconnecter</button>
}

export default LogoutPage;
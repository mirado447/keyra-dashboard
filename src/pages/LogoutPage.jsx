import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

//Remplacer cette page par un simple bouton onClick={handleLogout} dans le header ou navbar, sans route associée.
function LogoutPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return <button onClick={handleLogout}>Se déconnecter</button>
}

export default LogoutPage;
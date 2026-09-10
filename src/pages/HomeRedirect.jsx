import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function HomeRedirect() {
    const { token } = useAuth();
    return <Navigate to={token ? "/applications" : "/login"} replace />;
}

export default HomeRedirect;
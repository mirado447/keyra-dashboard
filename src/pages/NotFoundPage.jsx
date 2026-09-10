import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>Page introuvable</h1>
            <p><Link to="/">Retour à l'accueil</Link></p>
        </div>
    );
}

export default NotFoundPage;
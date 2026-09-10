import { useAuth } from "../context/useAuth";
import { getApplications, createApplication } from "../api/applications";
import { useEffect, useState } from "react";

function ApplicationsPage() {
    const { token } = useAuth();
    const [applications, setApplications] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [newlyCreated, setNewlyCreated] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadApplication() {
            try {
                const data = await getApplications(token);
                setApplications(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadApplication();
    }, [token]);

    async function handleCreate(e) {
        e.preventDefault();
        try {
            const created = await createApplication(name, token);
            setNewlyCreated(created);
            setApplications([...applications, created]);
            setName("");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    
    return (
        <div>
            <h1>Mes Applications</h1>

            { newlyCreated && (
                <div style={{ border: "2px solid orange", padding: "1rem" }}>
                    <p><strong>⚠️ Cette clé ne sera plus jamais affichée — copiez-la maintenant :</strong></p>
                    <code>{newlyCreated.private_key}</code>
                </div>
            )}

            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom de l'application"
                />
                <button type="submit">Creér</button>
            </form>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            { isLoading ? (
                <p>Chargement...</p>
            ): (
                <ul>
                    {applications.map((app) => (
                        <li key={app.id}>
                            {app.name} - <code>{app.public_key}</code>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ApplicationsPage;
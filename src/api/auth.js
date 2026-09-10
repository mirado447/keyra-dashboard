const BASE_URL = "http://localhost:8000";

export async function registerDeveloper(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/developers/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password}),
        });

        const data = await response.json();

        //TODO : rendre le message d'erreur plus explicite
        if (!response.ok) {
            const message = Array.isArray(data.detail)
                ? data.detail.map((err) => err.msg).join(", ")
                : data.detail || `Error: ${response.status}`
            throw new Error(message);
        }
        return data;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        throw error;
    }
}

export async function loginDeveloper(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/developers/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        })

        const data = await response.json();

        if (!response.ok) {
            const message = Array.isArray(data.detail)
                ? data.detail.map((err) => err.msg).join(", ")
                : data.detail || `Error: ${response.status}`
            throw new Error(message);
        }
        return data;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        throw error;
    }
}
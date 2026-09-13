# Keyra Dashboard

Interface développeur pour Keyra, une plateforme d'authentification-as-a-service (mini Auth0/Clerk) multi-tenant. Ce dépôt contient uniquement le frontend — le backend se trouve dans le dépôt [`keyra`](https://github.com/mirado447/keyra).

**Démo en ligne** : https://keyra-dashboard.vercel.app

---

## Fonctionnalités

- Inscription et connexion développeur (JWT)
- Création d'applications, chacune recevant une paire de clés (`public_key` / `private_key`)
- Affichage unique de la clé secrète à la création, jamais récupérable ensuite
- Régénération de clé secrète en cas de perte
- Liste des applications avec nombre d'utilisateurs finaux par application
- Page profil développeur
- Documentation intégrée des endpoints de l'API Keyra

---

## Stack technique

| Domaine | Techno |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Style | Tailwind CSS |
| Icônes | lucide-react |
| Gestion d'état global | React Context (`AuthContext`) |
| Déploiement | Vercel |

---

## Structure du projet

```
keyra-dashboard/
├── src/
│   ├── api/
│   │   ├── client.js          # fonction centrale apiFetch (gestion erreurs, 401)
│   │   ├── auth.js            # register/login/me développeur
│   │   └── applications.js    # CRUD applications
│   ├── components/
│   │   ├── ApplicationCard.jsx
│   │   └── ui/
│   │       ├── AuthLayout.jsx
│   │       ├── DashboardLayout.jsx
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Logo.jsx
│   │       ├── StatCard.jsx
│   │       └── ConfirmDialog.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ApplicationsPage.jsx
│   │   ├── CreateApplicationPage.jsx
│   │   ├── ApplicationDetailPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── DocumentationPage.jsx
│   │   ├── HomeRedirect.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── vercel.json                 # réécriture SPA (indispensable en production)
└── .env                        # variables locales (non commité)
```

---

## Installation et lancement local

### Prérequis
- Node.js 18+
- Le backend Keyra doit tourner (voir le [dépôt backend](https://github.com/mirado447/keyra)) — par défaut sur `http://localhost:8000`

### Étapes

```bash
git clone https://github.com/mirado447/keyra-dashboard.git
cd keyra-dashboard
npm install
```

Crée un fichier `.env` à la racine :
```
VITE_API_URL=http://localhost:8000
```

Lance le serveur de développement :
```bash
npm run dev
```
L'app est accessible sur `http://localhost:5173`.

---

## Variables d'environnement

| Variable | Description | Exemple |
|---|---|---|
| `VITE_API_URL` | URL de base de l'API Keyra à consommer | `https://keyra-production-8404.up.railway.app` |

**Important** : cette variable est préfixée `VITE_`, donc **visible dans le bundle JavaScript final** — elle ne doit jamais contenir de secret, uniquement une URL publique.

---

## Build de production

```bash
npm run build
```
Génère les fichiers statiques dans `dist/`.

---

## Déploiement (Vercel)

1. Connecter le dépôt GitHub à un nouveau projet Vercel
2. Définir `VITE_API_URL` dans Settings → Environment Variables (type **Config**, pas Secret — voir remarque ci-dessus)
3. Le fichier `vercel.json` à la racine est **indispensable** : sans lui, tout rafraîchissement sur une route autre que `/` (ex: `/login`, `/applications`) renvoie une 404, car Vercel cherche un fichier réel correspondant à l'URL au lieu de laisser React Router gérer le routing côté client :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### CORS côté backend

Le backend doit inclure l'URL de ce frontend dans sa configuration CORS (`allow_origins`) pour que les requêtes ne soient pas bloquées par le navigateur.

---

## Architecture — points clés

- **Séparation API / UI** : tous les appels réseau passent par `src/api/`, aucun composant ne fait de `fetch` directement — `apiFetch` (dans `client.js`) centralise la gestion des erreurs et la déconnexion automatique en cas de token expiré.
- **Authentification via Context** : `AuthContext` évite le prop drilling du token à travers plusieurs niveaux de composants ; `useAuth()` y donne accès depuis n'importe quel composant descendant de `AuthProvider`.
- **Routes protégées** : `ProtectedRoute` redirige vers `/login` si aucun token n'est présent.
- **Divulgation de clé secrète à usage unique** : `private_key` n'est jamais stockée dans l'état React au-delà de l'écran de création/régénération — elle disparaît de la mémoire au rafraîchissement de la page, cohérent avec le fait qu'elle n'est jamais récupérable depuis l'API après sa création.

---

## Licence

Projet personnel réalisé dans le cadre d'un portfolio technique. 
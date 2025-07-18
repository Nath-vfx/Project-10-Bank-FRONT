import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("connexion", "routes/connexion.tsx"), route("profil", "routes/profil.tsx")] satisfies RouteConfig;

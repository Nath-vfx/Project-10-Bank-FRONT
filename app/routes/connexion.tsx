import type { Route } from "./+types/home";
import Login from "../components/connexion/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Connexion" },
    { name: "description", content: "Connexion" },
  ];
}

export default function Connexion() {
  return <Login />;
}

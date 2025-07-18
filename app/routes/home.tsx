import type { Route } from "./+types/home";
import Welcome from "../components/home/Welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accueil" },
    { name: "description", content: "Accueil" },
  ];
}

export default function Home() {
  return (
    <Welcome />
  );
}

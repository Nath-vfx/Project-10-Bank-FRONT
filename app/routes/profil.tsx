import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profil" },
    { name: "description", content: "Profil" },
  ];
}

export default function Profil() {
  return <>
  <main className="main">
    <section className="account">
      <h2 className="account-title">Your Account</h2>
    </section>
  </main>
  </>;
}

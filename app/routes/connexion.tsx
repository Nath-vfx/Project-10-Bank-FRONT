import Login from '../components/connexion/Login';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Connexion' },
    { name: 'description', content: 'Connexion' },
  ];
}

export default function Connexion() {
  return <Login />;
}

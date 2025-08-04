import Welcome from '../components/home/Welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Accueil' }, { name: 'description', content: 'Accueil' }];
}

export default function Home() {
  return <Welcome />;
}

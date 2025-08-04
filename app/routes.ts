import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('connexion', 'routes/connexion.tsx'),
  route('profile', 'routes/profile.tsx'),
] satisfies RouteConfig;

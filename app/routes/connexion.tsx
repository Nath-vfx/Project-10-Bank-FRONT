import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Login from '../components/connexion/Login';
import type { Route } from './+types/home';
import type { RootState } from '~/store/store';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Connexion' },
    { name: 'description', content: 'Connexion' },
  ];
}

export default function Connexion() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return <Login />;
}

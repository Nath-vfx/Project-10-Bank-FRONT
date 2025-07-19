import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useProfileApi } from '~/hooks/useProfileApi';
import type { Route } from './+types/home';
import type { RootState } from '~/store/store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profil' }, { name: 'description', content: 'Profil' }];
}

export default function Profile() {
  const { profile, updateProfile } = useProfileApi();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/connexion');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    // Le useEffect va gérer la redirection
    return null;
  }

  return (
    <main className="main">
      <section className="account">
        <h2 className="account-title">Welcome back</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (!token) {
              // In a real app, you might want to redirect to login or show an error message
              alert('Please log in to update your profile');
              return;
            }

            const formData = new FormData(e.currentTarget);
            const firstName = formData.get('firstName') as string;
            const lastName = formData.get('lastName') as string;
            await updateProfile(token, { firstName, lastName });
          }}
        >
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              defaultValue={profile?.firstName}
              id="firstName"
              name="firstName"
              placeholder={profile?.firstName || 'First Name'}
              type="text"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              defaultValue={profile?.lastName}
              id="lastName"
              name="lastName"
              placeholder={profile?.lastName || 'Last Name'}
              type="text"
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </section>
    </main>
  );
}

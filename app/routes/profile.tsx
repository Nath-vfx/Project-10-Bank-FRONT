import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useProfileApi } from '~/hooks/useProfileApi';
import type { RootState } from '~/store/store';

export function meta() {
  return [{ title: 'Profil' }, { name: 'description', content: 'Profil' }];
}

export default function Profile() {
  const { profile, updateProfile } = useProfileApi();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/connexion');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
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
          <button className="edit-button" type="submit">
            Update
          </button>
        </form>
      </section>
    </main>
  );
}

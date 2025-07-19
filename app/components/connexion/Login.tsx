import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth';

export default function Login() {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login(email, password);
    if (result.success) {
      // Rediriger vers la page de profil après connexion réussie
      navigate('/profile');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              value={password}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="sign-in-button" disabled={loading} type="submit">
            {loading ? 'Connexion en cours...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}

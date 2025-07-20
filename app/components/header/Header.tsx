import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import { useProfileApi } from '~/hooks/useProfileApi';

export default function Header() {
  const { isAuthenticated, token, logout } = useAuth();
  const { profile: userProfile, fetchProfile, resetProfile } = useProfileApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProfile(token);
    }
  }, [isAuthenticated, token, fetchProfile]);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    resetProfile();
    navigate('/connexion');
  };

  return (
    <header>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <picture>
            <img
              alt="Argent Bank Logo"
              className="main-nav-logo-image"
              src="/img/argentBankLogo.png"
            />
          </picture>
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {isAuthenticated && userProfile ? (
            <div className="main-nav-item">
              <Link to="/profile">
                {userProfile?.firstName} {userProfile?.lastName}
              </Link>
              <button
                className="nav-button"
                onClick={handleSignOut}
                type="button"
              >
                Sign Out
                <picture>
                  <img
                    alt="Arrow right from bracket solid"
                    src="/img/arrow-right-from-bracket-solid.svg"
                  />
                </picture>
              </button>
            </div>
          ) : (
            <button
              className="nav-button"
              onClick={() => navigate('/connexion')}
              type="button"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

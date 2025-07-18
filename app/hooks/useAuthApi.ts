import { useState } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useAuthApi() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || '';

  if (!apiUrl) {
    console.warn("L'URL de l'API n'est pas définie dans les variables d'environnement");
  }

  const makeRequest = async <T>(
    endpoint: string,
    method: 'POST',
    body: any
  ): Promise<{ data: T | null; error: string | null }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Une erreur est survenue';
        setError(errorMessage);
        return { data: null, error: errorMessage };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue';
      setError(errorMessage);
      console.error('API Error:', err);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    return makeRequest<{ token: string }>('/user/login', 'POST', credentials);
  };

  const signup = async (userData: SignupData) => {
    return makeRequest<{ message: string }>('/user/signup', 'POST', userData);
  };

  return {
    // State
    error,
    isLoading,
    
    // Methods
    login,
    signup,
  };
}

import { useState } from 'react';

export interface UserProfile {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useProfileApi() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.VITE_API_URL || '';

  if (!apiUrl) {
    console.warn("L'URL de l'API n'est pas définie dans les variables d'environnement");
  }

  const makeRequest = async <T>(
    endpoint: string,
    method: 'POST' | 'PUT',
    token: string,
    body?: any
  ): Promise<{ data: T | null; error: string | null }> => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
      };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Une erreur est survenue lors de la récupération du profil';
        setError(errorMessage);
        return { data: null, error: errorMessage };
      }

      // Pour les réponses sans contenu (comme 204 No Content)
      if (response.status === 204) {
        return { data: null, error: null };
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

  const getProfile = async (token: string) => {
    return makeRequest<UserProfile>('/user/profile', 'POST', token, {});
  };

  const updateProfile = async (profileData: Partial<UserProfile>, token: string) => {
    return makeRequest<UserProfile>('/user/profile', 'PUT', token, profileData);
  };

  return {
    // State
    error,
    isLoading,
    
    // Methods
    getProfile,
    updateProfile,
  };
}

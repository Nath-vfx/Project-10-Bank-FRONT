import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { UserProfile } from '../store/slices/userProfileSlice';
import {
  clearProfile,
  fetchProfileFailure,
  fetchProfileStart,
  fetchProfileSuccess,
  updateProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
} from '../store/slices/userProfileSlice';
import type { AppDispatch, RootState } from '../store/store';

interface ApiResponse<T> {
  status: number;
  message: string;
  body: T;
}

export function useProfileApi() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: profile,
    loading: isLoading,
    error,
  } = useSelector((state: RootState) => state.userProfile);

  const apiUrl = import.meta.env.VITE_API_URL || '';

  if (!apiUrl) {
    // eslint-disable-next-line no-console
    console.warn(
      "L'URL de l'API n'est pas définie dans les variables d'environnement"
    );
  }

  const makeRequest = useCallback(
    async <T>(
      endpoint: string,
      method: 'POST' | 'PUT',
      token: string,
      body?: Record<string, unknown>
    ): Promise<{ data: T | null; error: string | null }> => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${apiUrl}${endpoint}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = (await response.json()) as ApiResponse<T>;

        if (!response.ok) {
          return {
            data: null,
            error: data.message || 'Une erreur est survenue',
          };
        }

        return { data: data.body, error: null };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Une erreur inconnue est survenue';
        return { data: null, error: errorMessage };
      }
    },
    [apiUrl]
  );

  const fetchProfile = useCallback(
    async (token: string): Promise<void> => {
      try {
        dispatch(fetchProfileStart());
        const { data, error } = await makeRequest<UserProfile>(
          '/user/profile',
          'POST',
          token
        );

        if (error || !data) {
          throw new Error(
            error || 'Impossible de récupérer le profil utilisateur'
          );
        }

        dispatch(fetchProfileSuccess(data));
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erreur inconnue lors de la récupération du profil';
        dispatch(fetchProfileFailure(errorMessage));
      }
    },
    [dispatch, makeRequest]
  );

  const updateProfile = useCallback(
    async (
      token: string,
      userData: { firstName: string; lastName: string }
    ): Promise<boolean> => {
      try {
        dispatch(updateProfileStart());
        const { data, error } = await makeRequest<UserProfile>(
          '/user/profile',
          'PUT',
          token,
          userData
        );

        if (error || !data) {
          throw new Error(
            error || 'Impossible de mettre à jour le profil utilisateur'
          );
        }

        dispatch(updateProfileSuccess(data));
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erreur inconnue lors de la mise à jour du profil';
        dispatch(updateProfileFailure(errorMessage));
        return false;
      }
    },
    [dispatch, makeRequest]
  );

  const resetProfile = useCallback(() => {
    dispatch(clearProfile());
  }, [dispatch]);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    resetProfile,
  };
}

import { useDispatch, useSelector } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout as logoutAction,
} from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store/store';
import { useAuthApi } from './useAuthApi';

interface LoginResponse {
  status: number;
  message: string;
  body: {
    token: string;
  };
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const authApi = useAuthApi();

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    const { data, error: apiError } = await authApi.login<LoginResponse>({
      email,
      password,
    });

    if (apiError || !data?.body?.token) {
      const errorMessage = data?.message || apiError || 'Authentication failed';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }

    dispatch(loginSuccess(data.body.token));
    return { success: true };
  };

  const signOut = () => {
    dispatch(logoutAction());
  };

  return {
    // State
    token,
    isAuthenticated,
    loading,
    error,

    // Actions
    login,
    logout: signOut,
  };
};

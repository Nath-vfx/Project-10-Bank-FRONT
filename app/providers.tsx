'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { init } from './store/slices/authSlice';
import { store } from './store/store';

// Wrapper component to handle client-side initialization
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // This effect only runs on the client side
    dispatch(init());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}

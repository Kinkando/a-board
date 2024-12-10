import { AxiosError } from 'axios';
import { useCallback, useContext, useState } from 'react';
import GlobalContext from '@/core/context/global';
import { login } from '@/core/repository/authen';
import { getUser } from '@/core/repository/user';

export function useSignIn() {
  const { alert, setUser } = useContext(GlobalContext);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signIn = useCallback(async (username: string) => {
    if (username.length < 3) {
      alert({
        message: 'Please enter username at least 3 characters',
        severity: 'warning',
      });
      return;
    }
    setIsSigningIn(true);
    try {
      const { accessToken, refreshToken } = await login(username);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const user = await getUser();
      setUser(user);
    } catch (error) {
      let err = `${error}`;
      if (error instanceof AxiosError && error.response) {
        err = `${error.response.data.error}`;
      }
      alert({ message: err, severity: 'error' });
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  return {
    signIn,
    isSigningIn,
  };
}

import { useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/core/repository/authen';
import { getUser } from '@/core/repository/user';
import GlobalContext from '@/core/context/global';
import { AxiosError } from 'axios';

export function useSignIn() {
  const { alert, setUser } = useContext(GlobalContext);
  const { push } = useRouter();

  const signIn = useCallback(async (username: string) => {
    try {
      const { accessToken, refreshToken } = await login(username);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const user = await getUser();
      setUser(user);
      push('/');
    } catch (error) {
      let err = `${error}`;
      if (error instanceof AxiosError && error.response) {
        err = `${error.response.data.error}`;
      }
      alert({ message: err, severity: 'error' });
    }
  }, []);

  return {
    signIn,
  };
}

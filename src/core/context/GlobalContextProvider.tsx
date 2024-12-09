'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Alert } from '@/core/@types/alert';
import GlobalContext from '@/core/context/global';
import { useUser } from '@/core/hooks/user';
import AlertComponent from '@/components/ui/Alert';

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alert, setAlert] = useState<Alert>({
    isOpen: false,
    message: '',
    severity: 'info',
  });
  const { user, setUser, isReady } = useUser();

  const { push } = useRouter();
  const pathname = usePathname();

  // auth guard
  useEffect(() => {
    if (isReady && user && pathname === '/sign-in') {
      push('/');
    }
  }, [pathname, isReady, user]);

  return (
    <GlobalContext.Provider
      value={{
        alert: (alert) => setAlert({ ...alert, isOpen: true }),
        user,
        setUser,
        isReady,
      }}
    >
      <AlertComponent
        {...alert}
        onDismiss={() => setAlert((alert) => ({ ...alert, isOpen: false }))}
      />
      {children}
    </GlobalContext.Provider>
  );
}

'use client';

import { useState } from 'react';
import { Alert } from '@/core/@types/alert';
import GlobalContext from '@/core/context/global';
import AlertComponent from '@/core/components/shared/Alert';
import { useUser } from '@/core/hooks/user';

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

'use client';

import { Button, TextInput, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useSignIn } from '@/module/sign-in/hooks/sign-in';

export default function SignInCard() {
  const [username, setUsername] = useState('');
  const { signIn, isSigningIn } = useSignIn();
  return (
    <div className="flex flex-col gap-10 max-w-96 w-full">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="flex flex-col gap-5">
        <TextInput
          className="w-full h-10"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isSigningIn}
        />
        <Button
          className="h-10 bg-success hover:!bg-success hover:brightness-75 ease-in duration-75 transition-all w-full !ring-0 !border-none !outline-none"
          onClick={() => signIn(username)}
          disabled={isSigningIn}
        >
          <div className="flex items-center gap-2">
            {isSigningIn && <Spinner size="sm" />}
            <span>Sign In</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

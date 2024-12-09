'use client';

import { Button, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useSignIn } from '../hooks/sign-in';

export default function SignInCard() {
  const [username, setUsername] = useState('');
  const { signIn } = useSignIn();
  return (
    <div className="flex flex-col gap-10 max-w-96 w-full">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="flex flex-col gap-5">
        <TextInput
          className="w-full h-10"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          className="h-10 bg-success hover:!bg-success hover:brightness-75 ease-in duration-75 transition-all"
          onClick={() => signIn(username)}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

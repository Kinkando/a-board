'use client';

import { Button, TextInput } from 'flowbite-react';

export default function SignInCard() {
  return (
    <div className="flex flex-col gap-10 max-w-96 w-full">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="flex flex-col gap-5">
        <TextInput className="w-full h-10" placeholder="Username" />
        <Button className="h-10 bg-success">Sign In</Button>
      </div>
    </div>
  );
}

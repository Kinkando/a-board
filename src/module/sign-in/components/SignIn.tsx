'use client';

import Image from 'next/image';
import { useContext } from 'react';
import SignInCard from './SignInCard';
import GlobalContext from '@/core/context/global';

export default function SignIn() {
  document.title = 'Sign In | a Board';
  const { isReady, user } = useContext(GlobalContext);
  if (!isReady || user) {
    return <></>;
  }

  return (
    <div className="bg-green-500 flex flex-col-reverse lg:flex-row h-screen w-screen overflow-auto">
      <section className="flex flex-[1.5_2] h-full items-center justify-center p-4">
        <SignInCard />
      </section>

      <section className="flex-1 bg-green-300 rounded-b-[36px] lg:rounded-s-[36px] flex justify-center items-center">
        <section className="p-4 flex flex-col items-center justify-center gap-7 lg:gap-10">
          <Image
            src="/logo.png"
            alt="Sign In Logo"
            width={300}
            height={230}
            className="max-w-[300px] w-full lg:w-[300px]"
            objectFit="cover"
            priority
          />
          <Image
            src="/text.png"
            alt="Sign In Text"
            width={96}
            height={230}
            objectFit="cover"
            priority
          />
        </section>
      </section>
    </div>
  );
}

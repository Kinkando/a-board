import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="w-full min-h-[calc(100vh-60px)] bg-white text-black">
      <div className="flex items-center justify-center w-full h-[calc(100vh-60px)] p-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image alt="Not Found" src="/404.png" width={200} height={200} />
          <p className="font-bold text-xl uppercase">Page Not Found</p>
          <p className="max-w-96">
            It seems like the page you’re looking for doesn’t exist or has been
            moved. Don’t worry though — you can easily get back on track by
            going to our homepage.
          </p>
          <p>Click the button below to return to the homepage:</p>
          <Link href="/">
            <Button color="success">Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

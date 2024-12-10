import { Avatar, Button, Drawer, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSX, useState } from 'react';
import { User } from '@/core/@types/user';
import {
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  RightArrowIcon,
} from '@/components/icons';

export type TopbarProps = {
  pathname: string;
  user?: User;
  router: {
    icon: JSX.Element;
    name: string;
    path: string;
  }[];
};

export default function Topbar({ pathname, user, router }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 h-[60px] bg-green-500 gap-6">
      <Link href="/">
        <Image
          src="/text.png"
          alt="Sign In Text"
          width={69}
          height={24}
          objectFit="cover"
          priority
        />
      </Link>

      {/* Sign In Button */}
      {!user && (
        <div className="hidden lg:block">
          <Link href="/sign-in">
            <Button className="h-10 w-[105px] button-success no-border animate">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      {/* Avatar Section */}
      {user && (
        <div className="gap-5 w-fit text-ellipsis overflow-hidden whitespace-nowrap hidden lg:flex lg:items-center">
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-fit">
            {user.username}
          </div>
          <Dropdown
            label=""
            dismissOnClick
            renderTrigger={() => (
              <Avatar
                className="cursor-pointer"
                rounded
                img={user.profileImageUrl}
              />
            )}
          >
            <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        </div>
      )}

      {/* Hamburger Menu Drawer */}
      <div className="lg:hidden">
        <div
          className="cursor-pointer stroke-white"
          onClick={() => setIsOpen(true)}
        >
          {MenuIcon}
        </div>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          className="bg-green-500 py-8 px-4 space-y-9"
        >
          <div
            className="cursor-pointer px-3 py-2 w-fit ml-1 stroke-2 stroke-white h-8"
            onClick={() => setIsOpen(false)}
          >
            {RightArrowIcon}
          </div>

          <section className="flex flex-col justify-between h-[calc(100%-68px)]">
            <section>
              {router.map((router) => (
                <Link
                  key={router.name}
                  href={router.path}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={
                      'cursor-pointer flex items-center gap-3 px-3 py-2 stroke-white' +
                      (pathname === router.path ? ' font-bold stroke-2' : '')
                    }
                  >
                    {router.icon}
                    <span>{router.name}</span>
                  </div>
                </Link>
              ))}
            </section>

            {!user && (
              <Link href="/sign-in">
                <div className="cursor-pointer flex items-center gap-3 px-3 py-2 stroke-white mb-auto">
                  {LoginIcon}
                  <span>Sign In</span>
                </div>
              </Link>
            )}

            {user && (
              <section>
                <div
                  className="cursor-pointer flex items-center gap-3 px-3 py-2 stroke-white mb-auto"
                  onClick={signOut}
                >
                  {LogoutIcon}
                  <span>Sign Out</span>
                </div>
              </section>
            )}
          </section>
        </Drawer>
      </div>
    </div>
  );
}

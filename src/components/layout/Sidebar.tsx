import Link from 'next/link';
import { JSX } from 'react';

export type SidebarProps = {
  pathname: string;
  router: {
    icon: JSX.Element;
    name: string;
    path: string;
  }[];
};

export default function Sidebar({ pathname, router }: SidebarProps) {
  return (
    <div className="py-8 px-4 text-black">
      {router.map((router) => (
        <Link key={router.name} href={router.path}>
          <div
            className={
              'cursor-pointer flex items-center gap-3 px-3 py-2 stroke-black' +
              (pathname === router.path ? ' font-bold stroke-2' : '')
            }
          >
            {router.icon}
            <span>{router.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

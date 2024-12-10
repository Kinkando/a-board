import { useContext, useMemo } from 'react';
import Topbar from './Topbar';
import GlobalContext from '@/core/context/global';
import { BlogIcon, HomeIcon } from '@/components/icons';
import Sidebar from './Sidebar';

const skipBaseLayoutPaths = ['/sign-in'];

const router = [
  {
    icon: HomeIcon,
    name: 'Home',
    path: '/',
  },
  {
    icon: BlogIcon,
    name: 'Our Blog',
    path: '/blog',
  },
];

export type BaseLayoutProps = {
  children: React.ReactNode;
  pathname: string;
};

export default function BaseLayout({ children, pathname }: BaseLayoutProps) {
  const { user } = useContext(GlobalContext);
  const isUseBaseLayout = useMemo(
    () => !skipBaseLayoutPaths.includes(pathname),
    [pathname],
  );
  if (!isUseBaseLayout) {
    return children;
  }

  return (
    <>
      <Topbar user={user} pathname={pathname} router={router} />
      <div className="w-full h-[calc(100vh-60px)] lg:flex">
        <div className="hidden lg:block min-w-[280px]">
          <Sidebar pathname={pathname} router={router} />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}

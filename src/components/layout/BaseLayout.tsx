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
      <div className="w-full h-[calc(100vh-60px)]">
        <div className="hidden lg:block lg:absolute left-0 top-[60px] w-[280px]">
          <Sidebar pathname={pathname} router={router} />
        </div>
        <div className="block lg:absolute lg:min-w-[460px] lg:w-[calc(100vw-560px)] lg:left-1/2 lg:-translate-x-1/2 lg:min-h-[calc(100vh-60px)] lg:p-8">
          {children}
        </div>
      </div>
    </>
  );
}

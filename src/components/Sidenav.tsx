'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import {
  BookCheck,
  ChevronFirst,
  ChevronLast,
  LogOut,
  ScrollText,
  UserRoundPlus,
} from 'lucide-react';
import { BarChart3, Package, UserCircle } from 'lucide-react';

import useHasMounted from '@/hooks/hasMounted';

import { useAuthStore } from '@/store/auth/auth.store';
import { useUIStore } from '@/store/ui/ui-store';

interface SideBarProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
  url?: string;
  action?: () => void;
}

const pages = [
  {
    alert: false,
    url: '/',
    icon: <BarChart3 size={20} />,
    text: 'Home',
  },
  {
    alert: false,
    url: '/meetings/createmeeting',
    icon: <Package size={20} />,
    text: 'Reserve',
  },
  {
    alert: false,
    url: '/teacher',
    icon: <BookCheck size={20} />,
    text: 'Teacher',
  },
  /*{
    alert: false,
    url: "/profile",
    icon: <UserRound size={20} />,
    text: "Profile",
  },*/
];

export default function SideNav() {
  const hasMounted = useHasMounted();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const user = useAuthStore((state) => state.user);
  const isSideNavOpen = useUIStore((state) => state.isSideNavOpen);
  const toggleMenu = useUIStore((state) => state.toggleSideNav);

  function handleLogOut() {
    logoutUser();
    redirect('/landing');
  }

  return (
    <aside
      className={`sticky top-0 h-screen max-sm:hidden ${isSideNavOpen ? 'max-w-72' : 'max-w-16'}`}
    >
      <nav className="sticky flex h-full flex-col border-r from-orange-500 shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <Link href="/">
            <Image
              className="overflow-hidden"
              src="/TE_logo.png"
              width={20}
              height={20}
              alt="logo"
            />
          </Link>
          <button
            onClick={() => toggleMenu()}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-green-100"
          >
            {isSideNavOpen ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {hasMounted && (
          <ul className="flex-1 px-3">
            {pages.map((page) => (
              <SidebarItem
                key={page.url}
                icon={page.icon}
                url={page.url}
                text={page.text}
                alert={page.alert}
              />
            ))}

            {user && user.roles && user?.roles?.includes('admin') && (
              <SidebarItem
                key={'requests'}
                url="/requests"
                icon={<ScrollText size={20} />}
                text="Requests"
                alert={false}
              />
            )}

            {isLoggedIn ? (
              <SidebarItem
                action={handleLogOut}
                key={'logout'}
                icon={<LogOut />}
                text="logout"
                alert={false}
              />
            ) : (
              <>
                <SidebarItem
                  key={'login'}
                  url="/login"
                  icon={<UserCircle size={20} />}
                  text="Log In"
                  alert={false}
                />
                <SidebarItem
                  key={'signup'}
                  url="/signup"
                  icon={<UserRoundPlus size={20} />}
                  text="Sign Up"
                  alert={false}
                />
              </>
            )}
          </ul>
        )}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, url, action }: SideBarProps) {
  const pathname = usePathname();
  const isSideNavOpen = useUIStore((state) => state.isSideNavOpen);
  const activeClass = pathname === url ? 'bg-primary text-white' : '';
  console.log();

  return (
    <Link
      href={url ? url : ''}
      onClick={action ? () => action() : () => {}}
    >
      <li
        className={` ${activeClass} group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium text-gray-600 transition-colors hover:bg-green-200`}
      >
        {icon}
        <span
          className={`overflow-hidden ${isSideNavOpen ? 'ml-3 w-52' : 'w-0'}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded bg-yellow-400 ${isSideNavOpen ? '' : 'top-2'} `}
          />
        )}

        {!isSideNavOpen && (
          <div
            className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-green-200 px-2 py-1 text-sm text-indigo-800 opacity-20 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

"use client";

import { useUIStore } from "@/store/ui/ui-store";
import {
  ChevronFirst,
  ChevronLast,
  BookCheck,
  LogOut,
  UserRoundPlus,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { BarChart3, Package, UserCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth/auth.store";
import { redirect, usePathname } from "next/navigation";
import useHasMounted from "@/hooks/hasMounted";

interface SideBarProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
  url?: string;
  action?: () => void;
}

const pages = [
  { alert: false, url: "/", icon: <BarChart3 size={20} />, text: "Home" },
  {
    alert: false,
    url: "/meetings/createmeeting",
    icon: <Package size={20} />,
    text: "Reserve",
  },
  {
    alert: false,
    url: "/teacher",
    icon: <BookCheck size={20} />,
    text: "Teacher",
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

  const user = useAuthStore(state => state.user);
  const isSideNavOpen = useUIStore((state) => state.isSideNavOpen);
  const toggleMenu = useUIStore((state) => state.toggleSideNav);

  function handleLogOut() {
    logoutUser();
    redirect("/");
  }

  return (
    <aside className={`top-0 sticky h-screen max-sm:hidden ${isSideNavOpen ? "max-w-72" : "max-w-16"}`}>
      <nav className="h-full sticky flex flex-col from-orange-500 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h3 className="overflow-hidden ">Meetings</h3>
          <button
            onClick={() => toggleMenu()}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-green-100"
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

            { user && user.roles && user?.roles?.includes("admin") && (
              <SidebarItem
                key={"requests"}
                url="/requests"
                icon={<ScrollText size={20}/>}
                text="Requests"
                alert={false}
              />
            )}

            {isLoggedIn ? (
              <SidebarItem
                action={handleLogOut}
                key={"logout"}
                icon={<LogOut />}
                text="logout"
                alert={false}
              />
            ) : (
              <>
                <SidebarItem
                  key={"login"}
                  url="/login"
                  icon={<UserCircle size={20} />}
                  text="Log In"
                  alert={false}
                />
                <SidebarItem
                  key={"signup"}
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
  const activeClass =
    pathname === url
      ? "bg-primary text-white"
      : "";
  console.log();

  return (
    <Link href={url ? url : ""} onClick={action ? () => action() : () => {}}>
      <li
        className={`
            ${activeClass}
            relative flex items-center py-2 px-3 my-1 
            font-medium rounded-md cursor-pointer transition-colors group
            hover:bg-green-200 text-gray-600
        `}
      >
        {icon}
        <span
          className={`overflow-hidden ${isSideNavOpen ? "w-52 ml-3" : "w-0"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-yellow-400
                            ${isSideNavOpen ? "" : "top-2"}
                        `}
          />
        )}

        {!isSideNavOpen && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-green-200 text-indigo-800 text-sm invisible
            opacity-20 -translate-x-3  
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

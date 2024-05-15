"use client";

import { useUIStore } from "@/store/ui/ui-store";
import { ChevronFirst, ChevronLast, MoreVertical, BookCheck, LogOut } from "lucide-react";
import Link from "next/link";
import { BarChart3, Boxes, Package, Receipt, UserCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth/auth.store";
import { redirect, useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

interface SideBarProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
  url?: string;
  // action?: MouseEventHandler<HTMLAnchorElement> | undefined
  action?: () => void;
}


const pages = [
  {alert: true,  url: "/", active: true, icon: <BarChart3 size={20} />, text: "Home", },
  {alert: false, url: "/meetings/createmeeting", active: false, icon: <Package size={20} />, text: "Reserve", },
  {alert: false, url: "/teacher", active: false, icon: <BookCheck size={20} />, text: "Teacher", },
  // {alert: false, url: "/login", active: false, icon: <UserCircle size={20} />, text: "Login", },
];

export default function SideNav() {

  const isLoggedIn = useAuthStore(state => state.isLoggedIn());
  const logoutUser = useAuthStore(state => state.logoutUser);
  const status = useAuthStore(state => state.status)
  const router = useRouter()

  const user = null
  const isSideNavOpen = useUIStore((state) => state.isSideNavOpen);
  const toggleMenu = useUIStore((state) => state.toggleSideNav);

  function handleLogOut() {
    // router.replace("/")
    logoutUser()
    redirect("/")
  }

  return (
    <aside className={`h-screen bg-orange-100 ${isSideNavOpen ? "max-w-72" : "max-w-16"}`}>
      <nav className="h-full flex flex-col bg-gradient-to-br to-red-400 from-orange-500 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h3 className="overflow-hidden ">Meetings</h3>
          <button
            onClick={() => toggleMenu()}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isSideNavOpen ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
        { pages.map(page => (
            <SidebarItem 
              key={page.url} 
              icon={page.icon} 
              url={page.url} 
              text={page.text} 
              alert={page.alert} 
              active={page.active}
            />
        ))}

        {isLoggedIn ? (
            <SidebarItem 
                action={handleLogOut} 
                key={"logout"} 
                icon={<LogOut/>} 
                text="logout" 
                alert={false} 
                active={false} 
            />
        ): (
            <SidebarItem 
                key={"login"} 
                url="/login"
                icon={<UserCircle size={20} />} 
                text="Log In" 
                alert={false} 
                active={false} 
            />
        )}

        </ul>

        {user && (

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=ffdd44&color=1130a3&bold=true"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
                flex justify-between items-center 
                overflow-hidden ${isSideNavOpen ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-60">john@doe.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
        )}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, url, action }: SideBarProps) {
  const isSideNavOpen = useUIStore((state) => state.isSideNavOpen);
  return (
    <Link href={url ? url : ""} onClick={action ? () => action() : null}>
      <li
        className={`
                relative flex items-center py-2 px-3 my-1 
                font-medium rounded-md cursor-pointer transition-colors group
                ${
                  active
                    ? "bg-gradient-to-tr from-gray-200 to-blue-100 text-gray-800"
                    : "hover:bg-yellow-50 text-gray-600"
                } 
            `}
      >
        {icon}
        <span
          className={`overflow-hidden ${
            isSideNavOpen ? "w-52 ml-3" : "w-0"
          }`}
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
            bg-yellow-100 text-indigo-800 text-sm invisible
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

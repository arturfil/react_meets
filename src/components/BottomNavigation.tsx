"use client";

import { BarChart3, BookCheck, Package, ScrollText } from "lucide-react";
import Link from "next/link";

export default function BottomNavigation() {
  return (
    <div
      className="
        bottom-0 left-0 right-0    
           container fixed w-full  border-t-2 z-10
           border-gray-300 h-10 justify-between pt-[20px] pb-[60px]
           text-gray-500 bg-white 
            flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden
        "
    >
      <div className="flex bg-red-400 ">
        <Link href="/">
          <BarChart3 size={15} className="justify-center mx-auto" />
          <h2>Home</h2>
        </Link>
      </div>
      <div className="">
        <Link href="/meetings/createmeeting">
          <Package size={15} className="mx-auto" />
          <h2>Reserve </h2>
        </Link>
      </div>
      <div className="">
        <Link href="/teacher">
          <BookCheck size={15} className="mx-auto" />
          <h2>Teacher</h2>
        </Link>
      </div>
      <div className="">
        <Link href="/requests">
          <ScrollText size={15} className="mx-auto" />
          <h2>Request</h2>
        </Link>
      </div>
    </div>
  );
}

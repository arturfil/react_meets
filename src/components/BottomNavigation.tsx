'use client';

import Link from 'next/link';

import { BarChart3, BookCheck, Package, ScrollText } from 'lucide-react';

export default function BottomNavigation() {
  return (
    <div className="container dark:bg-gray-800 dark:text-gray-50 fixed bottom-0 left-0 right-0 z-10 flex h-10 w-full justify-between border-t-2 border-gray-300 bg-white pb-[60px] pt-[20px] text-gray-500 sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
      <div className="flex bg-red-400">
        <Link href="/">
          <BarChart3
            size={15}
            className="mx-auto justify-center"
          />
          <h2>Home</h2>
        </Link>
      </div>
      <div className="">
        <Link href="/meetings/createmeeting">
          <Package
            size={15}
            className="mx-auto"
          />
          <h2>Reserve </h2>
        </Link>
      </div>
      <div className="">
        <Link href="/teacher">
          <BookCheck
            size={15}
            className="mx-auto"
          />
          <h2>Teacher</h2>
        </Link>
      </div>
      <div className="">
        <Link href="/requests">
          <ScrollText
            size={15}
            className="mx-auto"
          />
          <h2>Request</h2>
        </Link>
      </div>
    </div>
  );
}
